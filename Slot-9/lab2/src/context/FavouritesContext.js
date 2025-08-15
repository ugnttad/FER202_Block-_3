import { createContext, useContext, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage.js'

const FavouritesContext = createContext()

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useLocalStorage('favourites', [])

  const toggleFavourite = useCallback((id) => {
    let added = false
    setFavourites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      } else {
        added = true
        return [...prev, id]
      }
    })
    return added
  }, [setFavourites])

  const value = useMemo(() => ({ favourites, toggleFavourite }), [favourites, toggleFavourite])

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

FavouritesProvider.propTypes = { children: PropTypes.node }

export function useFavourites() {
  return useContext(FavouritesContext)
}