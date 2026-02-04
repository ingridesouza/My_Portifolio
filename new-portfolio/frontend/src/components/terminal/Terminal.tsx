import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { projectService, TerminalResponse } from '@/services/projectService'

interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error' | 'info' | 'project'
  content: string | object
}

export function Terminal() {
  const { t } = useTranslation()
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Initialize terminal
  useEffect(() => {
    setLines([
      {
        id: '1',
        type: 'info',
        content: t('projects.terminal.welcome'),
      },
      {
        id: '2',
        type: 'info',
        content: t('projects.terminal.help'),
      },
    ])
  }, [t])

  // Auto scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const addLine = (type: TerminalLine['type'], content: string | object) => {
    setLines(prev => [...prev, {
      id: crypto.randomUUID(),
      type,
      content,
    }])
  }

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    addLine('input', `$ ${command}`)
    setIsProcessing(true)

    if (command.toLowerCase() === 'clear') {
      setLines([])
      setIsProcessing(false)
      return
    }

    try {
      const response: TerminalResponse = await projectService.executeTerminalCommand(command)

      if (response.type === 'project') {
        addLine('project', response.content)
      } else {
        addLine(response.type as 'output' | 'error' | 'info', response.content as string)
      }
    } catch {
      addLine('error', 'Failed to execute command. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim() && !isProcessing) {
      executeCommand(currentCommand)
      setCurrentCommand('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0f0c29] rounded-xl overflow-hidden shadow-2xl border border-purple-500/30"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1831] border-b border-purple-500/20">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-4 text-purple-400 text-sm font-mono">
          ingride@portfolio:~/projetos$
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm scrollbar-thin"
      >
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-purple-500 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder={t('projects.terminal.placeholder')}
            className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-600"
            autoComplete="off"
          />
          {isProcessing && (
            <span className="text-purple-400 animate-pulse">...</span>
          )}
        </form>
      </div>
    </motion.div>
  )
}

function TerminalLine({ line }: { line: TerminalLine }) {
  if (line.type === 'input') {
    return (
      <div className="text-white mb-2">
        <span className="text-purple-500">{line.content as string}</span>
      </div>
    )
  }

  if (line.type === 'error') {
    return (
      <div className="text-red-400 mb-2 whitespace-pre-wrap">
        {line.content as string}
      </div>
    )
  }

  if (line.type === 'info') {
    return (
      <div className="text-purple-300 mb-2 whitespace-pre-wrap">
        {line.content as string}
      </div>
    )
  }

  if (line.type === 'project') {
    const project = line.content as {
      slug: string
      title: string
      description: string
      year: number
      technologies: string[]
      features: string[]
      links: { type: string; url: string }[]
    }

    return (
      <div className="bg-gradient-to-r from-[#1a1831] to-[#24243e] border-l-4 border-purple-500 p-4 rounded-r-lg my-4">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-purple-400 font-bold text-lg">{project.title}</h3>
          <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
            {project.year}
          </span>
        </div>

        <p className="text-gray-300 mb-4">{project.description}</p>

        {project.features?.length > 0 && (
          <div className="mb-4">
            <span className="text-purple-300 text-sm">Features:</span>
            <ul className="mt-1 space-y-1">
              {project.features.map((feature, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-500">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition-colors"
            >
              {link.type === 'code' ? 'Ver Codigo' : link.type === 'demo' ? 'Ver Demo' : link.type}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="text-gray-300 mb-2 whitespace-pre-wrap">
      {line.content as string}
    </div>
  )
}
