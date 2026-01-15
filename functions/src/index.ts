import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { spawn } from "child_process";
import Database from "better-sqlite3";

admin.initializeApp();

export const onNewUserSignup = functions.auth.user().onCreate(async (user) => {
    const email = user.email;
    const displayName = user.displayName;

    if (!email) {
        functions.logger.info("No email found for user, skipping SendX welcome email.", { uid: user.uid });
        return;
    }

    const sendxApiKey = functions.config().sendx?.api_key;
    if (!sendxApiKey) {
        functions.logger.error("SendX API key not found in functions config.");
        return;
    }

    const firstName = displayName ? displayName.split(" ")[0] : "Engineer";

    try {
        const response = await axios.post(
            "https://app.sendx.io/api/v1/subscribers",
            {
                email: email,
                firstName: firstName,
                tags: ["welcome"],
                // List ID provided by user
                lists: ["336914"],
            },
            {
                headers: {
                    "X-API-KEY": sendxApiKey,
                    "Content-Type": "application/json",
                },
            }
        );

        functions.logger.info("Successfully sent welcome email via SendX", {
            uid: user.uid,
            email: email,
            sendx_id: response.data?.id,
        });
    } catch (error: any) {
        functions.logger.error("Error sending welcome email via SendX", {
            uid: user.uid,
            email: email,
            error: error.message,
            response: error.response?.data,
        });
    }
});

// JavaScript Compiler Endpoint
export const executeJavascript = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { code } = req.body;

    if (!code || typeof code !== 'string') {
        res.status(400).json({ error: 'Code is required' });
        return;
    }

    // Create temporary file
    const tempDir = os.tmpdir();
    const fileName = `script_${Date.now()}_${Math.random().toString(36).substring(7)}.js`;
    const filePath = path.join(tempDir, fileName);

    try {
        // Write code to temporary file
        fs.writeFileSync(filePath, code);

        const startTime = Date.now();
        let stdout = '';
        let stderr = '';

        // Execute with timeout and resource limits
        const result = await new Promise<{ stdout: string; stderr: string; error?: string }>((resolve) => {
            const timeout = 5000; // 5 seconds timeout
            const child = spawn('node', [
                '--max-old-space-size=128', // Limit memory to 128MB
                filePath
            ], {
                timeout: timeout,
                env: {
                    PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
                    NODE_ENV: 'sandbox'
                }, // Minimal environment for Node.js execution
            });

            child.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            child.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve({ stdout, stderr });
                } else if (code === null) {
                    resolve({ stdout, stderr, error: 'Execution timeout (5s limit)' });
                } else {
                    resolve({ stdout, stderr, error: `Process exited with code ${code}` });
                }
            });

            child.on('error', (error) => {
                resolve({ stdout, stderr, error: error.message });
            });
        });

        const executionTime = Date.now() - startTime;

        // Clean up temp file
        fs.unlinkSync(filePath);

        res.status(200).json({
            stdout: result.stdout,
            stderr: result.stderr || result.error || '',
            time: `${executionTime}ms`
        });

    } catch (error: any) {
        // Clean up temp file on error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        functions.logger.error('JavaScript execution error:', error);
        res.status(500).json({
            stdout: '',
            stderr: error.message || 'Internal server error',
            time: '0ms'
        });
    }
});

// SQL test schema and data
const SQL_INIT_SCHEMA = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT,
        stock INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    INSERT OR IGNORE INTO users (id, name, email, age) VALUES
        (1, 'Alice Johnson', 'alice@example.com', 28),
        (2, 'Bob Smith', 'bob@example.com', 35),
        (3, 'Charlie Brown', 'charlie@example.com', 42),
        (4, 'Diana Prince', 'diana@example.com', 30),
        (5, 'Eve Wilson', 'eve@example.com', 25);

    INSERT OR IGNORE INTO products (id, name, price, category, stock) VALUES
        (1, 'Laptop', 999.99, 'Electronics', 50),
        (2, 'Mouse', 29.99, 'Electronics', 200),
        (3, 'Keyboard', 79.99, 'Electronics', 150),
        (4, 'Monitor', 299.99, 'Electronics', 75),
        (5, 'Desk Chair', 199.99, 'Furniture', 30);

    INSERT OR IGNORE INTO orders (id, user_id, product_id, quantity) VALUES
        (1, 1, 1, 1),
        (2, 1, 2, 2),
        (3, 2, 3, 1),
        (4, 3, 4, 2),
        (5, 4, 5, 1);
`;

// SQL Compiler Endpoint
export const executeSql = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { query } = req.body;

    if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query is required' });
        return;
    }

    // Create temporary database
    const tempDir = os.tmpdir();
    const dbFileName = `db_${Date.now()}_${Math.random().toString(36).substring(7)}.sqlite`;
    const dbPath = path.join(tempDir, dbFileName);

    let db: Database.Database | null = null;

    try {
        // Create and initialize temporary database
        db = new Database(dbPath);

        // Load predefined schema and test data
        db.exec(SQL_INIT_SCHEMA);

        const startTime = Date.now();
        let rows: any[] = [];
        let error = '';

        try {
            // Execute the user's query
            const stmt = db.prepare(query);
            
            // Check if it's a SELECT query
            if (query.trim().toUpperCase().startsWith('SELECT')) {
                rows = stmt.all();
            } else {
                // For INSERT, UPDATE, DELETE, etc.
                const info = stmt.run();
                rows = [{
                    changes: info.changes,
                    lastInsertRowid: info.lastInsertRowid,
                    message: `Query executed successfully. ${info.changes} row(s) affected.`
                }];
            }
        } catch (queryError: any) {
            error = queryError.message;
        }

        const executionTime = Date.now() - startTime;

        // Close database
        db.close();
        db = null;

        // Clean up temp database file
        fs.unlinkSync(dbPath);

        res.status(200).json({
            rows: rows,
            error: error,
            time: `${executionTime}ms`
        });

    } catch (error: any) {
        // Clean up
        if (db) {
            try {
                db.close();
            } catch (e) {
                // Ignore close errors
            }
        }
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }

        functions.logger.error('SQL execution error:', error);
        res.status(500).json({
            rows: [],
            error: error.message || 'Internal server error',
            time: '0ms'
        });
    }
});
