"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
}

const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
  { id: "csharp", name: "C#" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "ruby", name: "Ruby" },
  { id: "php", name: "PHP" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },
  { id: "scala", name: "Scala" },
  { id: "r", name: "R" },
  { id: "perl", name: "Perl" },
  { id: "haskell", name: "Haskell" },
  { id: "lua", name: "Lua" },
  { id: "sql", name: "SQL" },
  { id: "shell", name: "Shell" },
  { id: "elixir", name: "Elixir" },
  { id: "clojure", name: "Clojure" },
  { id: "dart", name: "Dart" },
  { id: "groovy", name: "Groovy" },
  { id: "fortran", name: "Fortran" },
  { id: "cobol", name: "COBOL" },
  { id: "assembly", name: "Assembly" },
  { id: "lisp", name: "Lisp" },
  { id: "prolog", name: "Prolog" },
  { id: "erlang", name: "Erlang" },
  { id: "fsharp", name: "F#" },
  { id: "ocaml", name: "OCaml" },
  { id: "racket", name: "Racket" },
  { id: "scheme", name: "Scheme" },
  { id: "vb", name: "Visual Basic" },
  { id: "pascal", name: "Pascal" },
  { id: "d", name: "D" },
  { id: "julia", name: "Julia" },
  { id: "nim", name: "Nim" },
  { id: "crystal", name: "Crystal" },
  { id: "objective-c", name: "Objective-C" },
  { id: "coffeescript", name: "CoffeeScript" },
  { id: "elm", name: "Elm" },
  { id: "purescript", name: "PureScript" },
  { id: "reason", name: "Reason" },
  { id: "zig", name: "Zig" },
  { id: "v", name: "V" },
  { id: "solidity", name: "Solidity" },
  { id: "move", name: "Move" },
  { id: "cairo", name: "Cairo" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "json", name: "JSON" },
  { id: "yaml", name: "YAML" },
  { id: "markdown", name: "Markdown" },
]

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.id} value={lang.id}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
