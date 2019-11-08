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
                ko: '신분증 스캔이 필요할 땐 신분증스캐너 뽄뽄!',
            },
            store: {
                aos: 'https://play.google.com/store/apps/details?id=com.yangga.idresizer',
                ios: 'https://apps.apple.com/app/id961606275',
            },
            icon: require('./icons/idscanner.png')
        },
        {
            id: 'dust',
            name: {
                en: 'Dust Checker',
                ko: '미세먼지 놉!',
            },
            desc: {
                en: 'Dust Checker',
                ko: '해외사이트로 미세먼지 체크를',
            },
            store: {
                aos: 'https://play.google.com/store/apps/details?id=com.dusclient',
                ios: 'https://apps.apple.com/app/id1236553661',
            },
            icon: require('./icons/dust.png')
        },
        {
            id: 'mokick',
            name: {
                en: 'Mokick',
                ko: '모두의 킥보드 모킥!',
            },
            desc: {
                en: 'Searching e-scooters around us',
                ko: '주변 모든 킥보드를 한번에 찾자',
            },
            store: {
                aos: 'https://play.google.com/store/apps/details?id=com.yangga.mokick',
                ios: 'https://apps.apple.com/app/id1484022513',
            },
            icon: require('./icons/mokick.png')
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

    mounted = false
    intervalRotation = null
    currentIdx = 0
    

    async componentDidMount() {
        this.mounted = true

        const idx = parseInt(new Date().getTime()) % FakeDatabase.apps.length
        this.changeIndex(idx)

        this.intervalRotation = setInterval(() => this.changeIndex(this.currentIdx + 1), 1000*10)
    }

    componentWillUnmount() {
        this.mounted = false

        if (this.intervalRotation) {
            clearInterval(this.intervalRotation)
        }
    }

    changeIndex = (idx) => {
        if (!this.mounted) return

        const newIdx = idx % FakeDatabase.apps.length

        const app = FakeDatabase.apps[newIdx]

        this.currentIdx = newIdx

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
