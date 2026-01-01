# Quick Start Guide - Integrated IDE

## Access the IDE

1. **Landing Page**: Navigate to [http://localhost:3000/practice](http://localhost:3000/practice)
2. **Launch IDE**: Click "Start Coding Now" or go to [http://localhost:3000/practice/ide](http://localhost:3000/practice/ide)

## Basic Usage

### Writing Code
1. Select your language from the dropdown (top-left)
2. Write code in the Monaco editor (center panel)
3. Click the green "Run" button to execute
4. View output in the Console tab (right panel)

### Multi-file Projects
1. Click the "+" button in File Explorer (left panel)
2. Enter filename (e.g., `utils.js`, `helper.py`)
3. Switch between files by clicking on them
4. All files are maintained in your session

### Whiteboard
1. Click the "Whiteboard" tab (top of center panel)
2. Select tools: Pen, Eraser, Shapes, Text
3. Choose colors from the palette
4. Draw diagrams, flowcharts, or algorithm designs
5. Use Undo/Redo or Clear buttons as needed

### Collaboration
1. Click "Collaborate" button (top-right)
2. Go to "Collab" tab (right panel)
3. Copy the session link
4. Share with peers or instructors
5. Chat in real-time

### Debugging
1. Go to "Debug" tab (right panel)
2. Add breakpoints by entering line numbers
3. Click "Run" to start debugging
4. Use Step Over, Step Into controls
5. Watch variables and expressions

### Performance Analysis
1. Run your code
2. Go to "Stats" tab (right panel)
3. View execution time, memory usage, CPU
4. Check code complexity metrics
5. Get optimization tips

### Code Playback
1. Make code changes over time
2. Playback controls appear at bottom
3. Click Play to review your coding process
4. Adjust speed: 0.5x, 1x, 2x
5. Use timeline to jump to any point

## Supported Languages

### Popular Languages
- JavaScript, TypeScript
- Python
- Java
- C++, C, C#
- Go
- Rust

### All 50+ Languages
JavaScript, TypeScript, Python, Java, C++, C, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Scala, R, Perl, Haskell, Lua, SQL, Shell, Elixir, Clojure, Dart, Groovy, Fortran, COBOL, Assembly, Lisp, Prolog, Erlang, F#, OCaml, Racket, Scheme, Visual Basic, Pascal, D, Julia, Nim, Crystal, Objective-C, CoffeeScript, Elm, PureScript, Reason, Zig, V, Solidity, Move, Cairo, HTML, CSS, JSON, YAML, Markdown

## Keyboard Shortcuts

### Editor
- `Ctrl/Cmd + S` - Save (future)
- `Ctrl/Cmd + /` - Comment line
- `Ctrl/Cmd + F` - Find
- `Ctrl/Cmd + H` - Replace
- `F5` - Run code (when mapped)

### General
- `Esc` - Cancel operations
- `Enter` - Confirm input
- `Tab` - Indent code

## Tips & Tricks

1. **Multi-file Projects**: Organize related code across files
2. **Whiteboard First**: Sketch your solution before coding
3. **Use Analytics**: Check performance after each run
4. **Code Playback**: Review your problem-solving approach
5. **Collaborate**: Practice pair programming with peers

## Troubleshooting

**Editor not loading?**
- Check internet connection (Monaco loads from CDN)
- Refresh the page

**Code not executing?**
- Currently in demo mode (shows simulated output)
- For production execution, configure Judge0 API

**Whiteboard not saving?**
- Whiteboard is session-based (not persistent)
- Take screenshots if needed

**Collaboration not syncing?**
- Real-time sync requires Firebase/Socket.IO configuration
- Chat works locally in current session

## Example Projects

### JavaScript: Hello World
```javascript
// main.js
console.log('Hello, World!');
```

### Python: Function Example
```python
# main.py
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

### Multi-file Java
```java
// Main.java
public class Main {
    public static void main(String[] args) {
        Helper helper = new Helper();
        System.out.println(helper.greet("World"));
    }
}

// Helper.java
public class Helper {
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

## Next Steps

1. **Practice Algorithms**: Implement sorting, searching algorithms
2. **Build Projects**: Create multi-file applications
3. **Interview Prep**: Solve coding challenges
4. **Collaborate**: Pair program with study partners
5. **Analyze Performance**: Optimize your code

## Support

- **Documentation**: See `IDE_IMPLEMENTATION.md` for details
- **Technical Docs**: See `IMPLEMENTATION_SUMMARY.md` for architecture

---

**Happy Coding! 🚀**
