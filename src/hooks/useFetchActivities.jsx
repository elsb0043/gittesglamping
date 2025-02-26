import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchActivities = () => {
    // State til at gemme aktiviteter, fejlbeskeder og loading-status
    const [activities, setActivities] = useState([]) // Når komponenten først rendes, har vi ikke nogen aktiviteter at vise, så vi initialiserer activities som et tomt array []
    const [error, setError] = useState(null) // Når komponenten først rendes, antager vi, at der ikke er nogen fejl, så vi sætter error til null
    const [isLoading, setIsLoading] = useState(false) // Når komponenten først rendes, er vi ikke i gang med at hente data, så isLoading sættes til false
    const { token } = useAuthContext() // Henter token fra auth-contexten

    // HENT ALLE AKTIVITETER 
    // Bruger useCallback for at memoisere funktionen (dvs. den genoprettes ikke ved hver render)
    const fetchActivities = useCallback(async () => {
        setError(null) // Nulstiller fejl før ny forespørgsel
        setIsLoading(true) // Viser loading-status
        try {
            // Fetcher alle aktiviteter fra API'et
            const response = await fetch("http://localhost:3042/activities")
            const data = await response.json()
            setActivities(data.data) // Gemmer aktiviteterne i state
        } catch (error) {
            setError(error.message) // Gemmer fejlbeskeden i state
            console.error("Error fetching activities:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status
        }
    }, [])

    // Refetch-funktion, der kalder fetchActivities igen
    const refetch = useCallback(() => {
        fetchActivities()
    }, [fetchActivities])


    // OPRET AKTIVITET
    const createActivity = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/activity", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Sender token med i headeren
                },
                body: formData, // Sender formData som body
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af aktivitet") // Fejlhåndtering, hvis status ikke er OK
            }

            const result = await response.json()
            return result // Returnerer resultatet
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error // Kaster fejlen videre, så den kan håndteres andre steder
        }
    }


    // OPDATER AKTIVITET
    const updateActivity = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/activity", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, // Brug token fra props
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af aktivitet")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved opdatering:", error)
            throw error
        }
    }


    // SLET AKTIVITET
    const deleteActivity = async (params) => {
        // Bekræftelse før sletning
        const isConfirmed = window.confirm("Er du sikker på du vil slette denne aktivitet?")
        if (!isConfirmed) {
            return // Stop funktionen, hvis brugeren annullerer
        }

        try {
            await fetch(`http://localhost:3042/activity/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Filtrerer den slettede aktivitet ud fra state
            const filteredArray = activities.filter((act) => act._id !== params)
            setActivities(filteredArray) // Opdaterer state med de tilbageværende aktiviteter
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT AKTIVITET BASERET PÅ ID
    const fetchActivityById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
            // Fetcher en specifik aktivitet baseret på ID
            const response = await fetch(`http://localhost:3042/activity/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch activity: ${errorText}`)
            }
    
            const activity = await response.json()
            return activity.data[0] // Returnerer den fundne aktivitet
        } catch (error) {
            setError(error.message)
            console.error("Error fetching activity:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status
        }
    }
    
    // useEffect til at hente aktiviteter ved første render
    useEffect(() => {
        fetchActivities()
    }, [])
    
    // Returnerer alle funktioner og state-variabler
    return {
        activities,
        createActivity,
        deleteActivity,
        setActivities,
        fetchActivities,
        fetchActivityById,
        updateActivity,
        isLoading,
        refetch,
        error,
    }
}

export { useFetchActivities }