import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchStays = () => {
    const [stays, setStays] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE STAYS – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
    const fetchStays = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/stays")
            const data = await response.json()
            setStays(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching stays:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Refetch-funktion, der blot kalder fetchStays
    const refetch = useCallback(() => {
        fetchStays()
    }, [fetchStays])


    // OPRET STAY
    const createStay = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/stay", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af ophold")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // OPDATER STAY
    const updateStay = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/stay", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af ophold")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // SLET STAY
    const deleteStay = async (params) => {
        const isConfirmed = window.confirm("Er du sikker på du vil slette dette ophold?")

        if (!isConfirmed) {
            return // Stop funktionen, hvis brugeren annullerer
        }

        try {
            await fetch (`http://localhost:3042/stay/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            /* Filter all the stays without the matching ID. */
            const filteredArray = stays.filter((act) => act._id !== params)
            setStays(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT STAY BASERET PÅ ID
    const fetchStayById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
          const response = await fetch(`http://localhost:3042/stay/${id}`)
    
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch stay: ${errorText}`)
          }
    
          const stay = await response.json()
          return stay.data[0]
        } catch (error) {
          setError(error.message)
          console.error("Error fetching stay:", error)
        } finally {
          setIsLoading(false)
        }
      }
    
      useEffect(() => {
        fetchStays()
      }, [])
    
      
      return {
        stays,
        createStay,
        deleteStay,
        setStays,
        fetchStays,
        fetchStayById,
        updateStay,
        isLoading,
        refetch,
        error,
      }
}

export { useFetchStays }