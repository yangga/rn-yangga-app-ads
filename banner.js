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

let Database = { ...FakeDatabase }

const BANNER_WIDTH = 300
    , BANNER_HEIGHT = 72
    , ICON_WIDTH = 72
    , ICON_HEIGHT = 72
    , BTN_GO_WIDTH = 40
    , BTN_GO_HEIGHT = 30

export default class Banner extends React.PureComponent {
    mounted = false
    intervalRotation = null
    currentIdx = 0

    state = {
        ...getStateFromDB(0)
    }

    async componentDidMount() {
        this.mounted = true

        try {
            const dbFromServer = await (await fetch('https://s3-ap-northeast-1.amazonaws.com/data.yangga-app-ads/meta/meta.json')).json()
            Database = dbFromServer
        }
        catch (e) {
            console.log('[yangga-app-ads] fetch err:', e)
        }

        const idx = parseInt(new Date().getTime()) % Database.apps.length
        this.changeIndex(idx)

        this.intervalRotation = setInterval(() => this.changeIndex(this.currentIdx + 1), 1000 * 10)
    }

    componentWillUnmount() {
        this.mounted = false

        if (this.intervalRotation) {
            clearInterval(this.intervalRotation)
            this.intervalRotation = null
        }
    }

    changeIndex = (idx) => {
        if (!this.mounted) return

        const newIdx = idx % Database.apps.length
        this.currentIdx = newIdx

        this.setState(getStateFromDB(newIdx))
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
                    <View style={styles.bannerInside}>
                        <View style={styles.iconContainer}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={icon} />
                        </View>
                        <View style={styles.descContainer}>
                            <Text style={{ fontSize: 16, marginBottom: 4 }}>{name}</Text>
                            <Text style={{ fontSize: 11, numberOfLines: 2 }}>{desc}</Text>
                        </View>
                        <View style={styles.btnGoContainer}>
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.goStore}>
                            <View style={styles.btnGo}>
                                <Text style={{ fontSize: 11, color: 'white' }}>이동</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    goStore = async () => {
        await Linking.openURL(this.state.store);
    }
}



function getStateFromDB(idx) {
    const app = Database.apps[idx % Database.apps.length]

    return {
        name: app.name.ko,
        desc: app.desc.ko,
        store: Platform.OS === 'android' ? app.store.aos : app.store.ios,
        icon: app.icon,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,

        backgroundColor: 'white'
    },
    bannerInside: {
        flex: 1,
        flexDirection: 'row'
    },
    iconContainer: {
        flex: ICON_WIDTH,
        height: '100%'
    },
    descContainer: {
        flex: BANNER_WIDTH-ICON_WIDTH-BTN_GO_WIDTH,
        height: '100%',
        paddingLeft: 10,
        paddingVertical: 10
    },
    btnGoContainer: {
        flex: BTN_GO_WIDTH,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 3
    },
    btnGo: {
        width: '100%',
        height: BTN_GO_HEIGHT,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    }
});
