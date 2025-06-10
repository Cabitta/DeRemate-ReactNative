import { useState, useEffect, useContext } from 'react'
import { View, ScrollView } from 'react-native'
import Loading from '../components/Loading'
import AvailableRoutesCard from '../components/AvailableRoutesCard'
import { AvailableRoutesService } from '../services/AvailableRoutesService'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../theme/appTheme'
import { Text } from 'react-native-paper'

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
            setAvailableRoutes(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryBackground }}>
        {loading ? (
            Loading()
        ) : (
            <ScrollView 
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 24, flexGrow: 1, justifyContent: 'center' }}>
                {availableRoutes === null ? (
                    <Text variant="titleLarge" style={{ color: COLORS.primaryButton }}>
                        Ocurrió un error al cargar las rutas. Intenta nuevamente.
                    </Text>
                ) : availableRoutes.length === 0 ? (
                    <Text variant="titleLarge" style={{ color: COLORS.primaryButton }}>No tenés rutas disponibles.</Text>
                ) : (
                    availableRoutes.map((route, idx) => (
                        <AvailableRoutesCard key={idx} availableRoute={route} />
                    ))
                )}
            </ScrollView>
        )}
    </View>
    )
}

export default AvailableRoutesScreen