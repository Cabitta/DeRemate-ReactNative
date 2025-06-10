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

    useEffect(() => {
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
        fetchData()
        // setAvailableRoutes(routes) // Usar datos de ejemplo
        // setLoading(false)
    }, [])

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

routes = [
        {
            address: "Callejón del Tiempo 999",
            client_name: "Juan",
            client_lastname: "Pérez",
            client_email: "juan.perez@example.com",
            package_sector: "C5",
            package_estante: 7,
            package_columna_estante: 4,
        },
        {
            address: "Avenida Siempre Viva 742",
            client_name: "María",
            client_lastname: "García",
            client_email: "maria.garcia@example.com",
            package_sector: "B2",
            package_estante: 3,
            package_columna_estante: 2,
        },
        {
            address: "Calle Falsa 123",
            client_name: "Pedro",
            client_lastname: "López",
            client_email: "pedro.lopez@example.com",
            package_sector: "A1",
            package_estante: 5,
            package_columna_estante: 1,
        },
        {
            address: "Boulevard de los Sueños 456",
            client_name: "Lucía",
            client_lastname: "Martínez",
            client_email: "lucia.martinez@example.com",
            package_sector: "D3",
            package_estante: 2,
            package_columna_estante: 5,
        },
        {
            address: "Pasaje de la Luna 321",
            client_name: "Carlos",
            client_lastname: "Ramírez",
            client_email: "carlos.ramirez@example.com",
            package_sector: "E4",
            package_estante: 6,
            package_columna_estante: 3,
        },
        {
            address: "Camino del Sol 654",
            client_name: "Ana",
            client_lastname: "Fernández",
            client_email: "ana.fernandez@example.com",
            package_sector: "F1",
            package_estante: 4,
            package_columna_estante: 2,
        },
        {
            address: "Ruta del Viento 888",
            client_name: "Miguel",
            client_lastname: "Torres",
            client_email: "miguel.torres@example.com",
            package_sector: "G6",
            package_estante: 8,
            package_columna_estante: 6,
        },
        {
            address: "Calle de la Esperanza 159",
            client_name: "Sofía",
            client_lastname: "Díaz",
            client_email: "sofia.diaz@example.com",
            package_sector: "H2",
            package_estante: 1,
            package_columna_estante: 7,
        },
        {
            address: "Avenida del Mar 753",
            client_name: "Diego",
            client_lastname: "Sánchez",
            client_email: "diego.sanchez@example.com",
            package_sector: "I3",
            package_estante: 9,
            package_columna_estante: 8,
        },
        {
            address: "Plaza Mayor 246",
            client_name: "Valentina",
            client_lastname: "Moreno",
            client_email: "valentina.moreno@example.com",
            package_sector: "J5",
            package_estante: 10,
            package_columna_estante: 9,
        },
    ]

export default AvailableRoutesScreen