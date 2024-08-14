'use client'

import { useState, useEffect } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format
} from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { withAuth } from '@/components/AuthContactDashboard'

const CalendarDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [days, setDays] = useState<{ date: string, isCurrentMonth: boolean, isToday: boolean }[]>([])

  useEffect(() => {
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    const daysArray = eachDayOfInterval({ start, end }).map((day) => ({
      date: format(day, 'yyyy-MM-dd'),
      isCurrentMonth: true,
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    }))
    setDays(daysArray)
  }, [selectedDate])

  const handleDateChange = (direction: number) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + direction)
      return newDate
    })
  }

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
              <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                <div className="flex items-center text-gray-900">
                  <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    onClick={() => handleDateChange(-1)}
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="flex-auto text-sm font-semibold">
                    {format(selectedDate, 'MMMM yyyy')}
                  </div>
                  <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    onClick={() => handleDateChange(1)}
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                  <div>S</div>
                </div>
                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                  {days.map((day, dayIdx) => (
                    <button
                      key={day.date}
                      type="button"
                      className={`py-1.5 hover:bg-gray-100 focus:z-10 ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${day.isToday ? 'font-semibold text-indigo-600' : ''} ${dayIdx === 0 ? 'rounded-tl-lg' : ''} ${dayIdx === 6 ? 'rounded-tr-lg' : ''} ${dayIdx === days.length - 7 ? 'rounded-bl-lg' : ''} ${dayIdx === days.length - 1 ? 'rounded-br-lg' : ''}`}
                    >
                      <time
                        dateTime={day.date}
                        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${day.isToday ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}
                      >
                        {format(new Date(day.date), 'd')}
                      </time>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default withAuth(CalendarDashboard)
