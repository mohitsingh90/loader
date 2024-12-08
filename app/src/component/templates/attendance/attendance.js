import * as React from 'react'
import { View, FlatList, Text, Switch } from 'react-native'


export const Attendance = () => {

    return <View>
        <FlatList
            data={[{ name: "aa" }]}
            ListHeaderComponent={() => <View style={{ flexDirection: "row", width: "100%", padding: 16 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Professor Name</Text>
                <View style={{ flex: 1 }} />
                <Text style={{ color: "white", fontWeight: "bold" }}>Attendance</Text>
            </View>}
            renderItem={() => <View style={{ flexDirection: "row", width: "100%", padding: 16 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Professor Name</Text>
                <View style={{ flex: 1 }} />
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={'#f5dd4b'}
                    onValueChange={() => { }}
                    value={true}
                />
            </View>}
        />
    </View>
}