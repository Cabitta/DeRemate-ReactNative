import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Text, View, ScrollView } from 'react-native'
import Loading from '../components/Loading'
import AvailableRoutesCard from '../components/AvailableRoutesCard'
import { AvailableRoutesService } from '../services/AvailableRoutesService'
import { AuthContext } from '../context/AuthContext'

const AvailableRoutesScreen = () => {
    const [loading, setLoading] = useState(true)
    const [availableRoutes, setAvailableRoutes] = useState([])
    const fetchAvailableRoutes = AvailableRoutesService()
    const { user } = useContext(AuthContext)
    const fetchData = async () => {
        setLoading(true)
        try {
            const data = await fetchAvailableRoutes(user?.id)
            setAvailableRoutes(data || [])
        } catch (error) {
            setAvailableRoutes([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            fetchData()
    }, [])

    // Pantalla de carga
    if (loading) {
        return Loading()
    }

    // Pantalla principal con la tarjeta de rutas disponibles
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 24, flexGrow: 1, justifyContent: 'center' }}>
                {availableRoutes.length === 0 ? (
                    <Text style={{ marginTop: 32, fontSize: 16, color: '#888' }}>No tenés rutas disponibles.</Text>
                ) : (
                    availableRoutes.map((route, idx) => (
                        <AvailableRoutesCard key={idx} availableRoute={route} />
                    ))
                )}
            </ScrollView>
        </View>
    )
}

export default AvailableRoutesScreen