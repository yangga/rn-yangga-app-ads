import React from 'react'
import { Image, Linking, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

const FakeDatabase = {
    apps: [
        {
            id: 'idscanner',
            name: {
                en: 'ID Scanner',
                ko: '신분증스캐너 뽄뽄',
            },
            desc: {
                en: 'IDScanner for scanned ID image',
                ko: '스캔한 신분증 이미지 필요할땐 신분증스캐너 뽄뽄!',
            },
            store: {
                aos: 'https://play.google.com/store/apps/details?id=com.yangga.idresizer',
                ios: 'https://apps.apple.com/app/id961606275',
            },
            icon: require('./icons/idscanner.png')
        }
    ]
}

const BANNER_WIDTH = 300
    , BANNER_HEIGHT = 72
    , ICON_WIDTH = 72
    , ICON_HEIGHT = 72

export default class Banner extends React.PureComponent {
    state = {
        name: 'null',
        desc: 'desc',
        store: 'https://play.google.com/store/apps/details?id=com.yangga.idresizer',
        icon: null,
    }
    

    async componentDidMount() {
        const app = FakeDatabase.apps[0]

        this.setState({
            name: app.name.ko,
            desc: app.desc.ko,
            store: Platform.OS === 'android' ? app.store.aos : app.store.ios,
            icon: app.icon,
        })
    }

    render() {
        const {
            containerStyle,
            bannerStyle,
        } = this.props

        const {
            name,
            desc,
            icon,
        } = this.state

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.banner, bannerStyle]}>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={this.goStore}>
                        <View style={styles.bannerInside}>
                            <View style={{
                                width: ICON_WIDTH, 
                                height: '100%'
                            }}>
                                <Image style={{width: ICON_WIDTH, height: ICON_HEIGHT}} source={icon} />
                            </View>
                            <View style={{
                                width: BANNER_WIDTH-ICON_WIDTH, 
                                paddingLeft: 10,
                                paddingVertical: 10,
                            }}>
                                <Text style={{fontSize: 16, marginBottom: 4}}>{name}</Text>
                                <Text style={{fontSize: 11}}>{desc}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    goStore = async () => {
        await Linking.openURL(this.state.store);
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 72,
        alignItems: "center",
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black'
    },
    banner: {
        flex:1, 
        justifyContent: "center", 
        alignItems: "center",
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        
        backgroundColor: 'white'
    },
    bannerInside: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10
    }
});
