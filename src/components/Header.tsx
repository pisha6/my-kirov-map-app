import { useState } from 'react'
import { Search, MapPin, Award, Compass, BookOpen } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'

interface HeaderProps {
  currentTab: string
  onTabChange: (tab: string) => void
  onSearch: (query: string) => void
  userStats: {
    visitedPlaces: number
    achievements: number
  }
}

export function Header({ currentTab, onTabChange, onSearch, userStats }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const tabs = [
    { id: 'explore', label: 'Поиск', icon: Compass },
    { id: 'collections', label: 'Коллекции', icon: BookOpen },
    { id: 'map', label: 'Карта', icon: MapPin },
    { id: 'achievements', label: 'Достижения', icon: Award }
  ]

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Логотип */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Куда пойдем?</h1>
              <p className="text-sm text-muted-foreground">Открывай новые места</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="flex-1 max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск мест..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>
          </div>

          {/* Статистика пользователя */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="secondary">
                Посещено: {userStats.visitedPlaces}
              </Badge>
              <Badge variant="secondary">
                Достижений: {userStats.achievements}
              </Badge>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="mt-4">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={currentTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}