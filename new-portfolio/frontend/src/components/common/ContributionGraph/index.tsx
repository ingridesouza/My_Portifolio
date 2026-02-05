import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { ContributionCalendar } from '@/services/githubService'

interface ContributionGraphProps {
  data: ContributionCalendar
  inView?: boolean
}

export function ContributionGraph({ data, inView = true }: ContributionGraphProps) {
  const { weeks, totalContributions } = data

  const monthLabels = useMemo(() => {
    const labels: { month: string; index: number }[] = []
    let lastMonth = ''

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0]
      if (firstDay) {
        const date = new Date(firstDay.date)
        const month = date.toLocaleString('default', { month: 'short' })
        if (month !== lastMonth) {
          labels.push({ month, index: weekIndex })
          lastMonth = month
        }
      }
    })

    return labels
  }, [weeks])

  const getContributionLevel = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-dark-700'
    if (count <= 3) return 'bg-green-200 dark:bg-green-900'
    if (count <= 6) return 'bg-green-400 dark:bg-green-700'
    if (count <= 9) return 'bg-green-500 dark:bg-green-500'
    return 'bg-green-600 dark:bg-green-400'
  }

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-1 min-w-max">
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map(({ month, index }, i) => (
              <span
                key={`${month}-${i}`}
                className="text-xs text-gray-500 dark:text-gray-400"
                style={{
                  position: 'relative',
                  left: `${index * 13}px`,
                  marginRight: i < monthLabels.length - 1
                    ? `${(monthLabels[i + 1]?.index - index - 1) * 13}px`
                    : 0
                }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-1">
              {dayLabels.map((label, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 dark:text-gray-400 h-[11px] leading-[11px] w-6 text-right pr-1"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: weekIndex * 0.01, duration: 0.2 }}
                className="flex flex-col gap-0.5"
              >
                {week.contributionDays.map((day, dayIndex) => (
                  <div
                    key={day.date}
                    className={`w-[11px] h-[11px] rounded-sm ${getContributionLevel(day.contributionCount)} transition-colors cursor-pointer hover:ring-1 hover:ring-gray-400 dark:hover:ring-gray-500`}
                    title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Less</span>
            <div className="w-[11px] h-[11px] rounded-sm bg-gray-100 dark:bg-dark-700" />
            <div className="w-[11px] h-[11px] rounded-sm bg-green-200 dark:bg-green-900" />
            <div className="w-[11px] h-[11px] rounded-sm bg-green-400 dark:bg-green-700" />
            <div className="w-[11px] h-[11px] rounded-sm bg-green-500 dark:bg-green-500" />
            <div className="w-[11px] h-[11px] rounded-sm bg-green-600 dark:bg-green-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
