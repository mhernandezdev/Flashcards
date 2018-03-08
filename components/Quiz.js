import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, TouchableOpacity, Animated, Easing, PanResponder, Dimensions } from 'react-native'
import Button from './Button'
import Card from './Card'
import styles, { lightgreen, statusgray, lightgray, white, orange } from '../utils/styles'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'


class Quiz extends Component {
    state = {
        current: 0,
        correct: false,
        correctCnt: 0,
        display: 'question',
        next:false,
        statusClr:white,
        btnsOpacity:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,

        scale:new Animated.Value(1),
        nextCardOpacity:new Animated.Value(0),
        nextCardMarg:new Animated.Value(60),
        nextCardDrag: new Animated.ValueXY()
    }

    componentWillMount() {
        const { nextCardDrag } = this.state;
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: Animated.event([
              null, {dx: nextCardDrag.x, dy: 0 }
            ]),
            onPanResponderGrant: () => {
                this.scrollView.setNativeProps({ scrollEnabled: false })
            },
            onPanResponderRelease: () => {
                const { current } = this.state;
                const deck = this.props.navigation.state.params.deck;

                // set the score here and if done
                this.setState((prev) => { return {
                    btnsOpacity:current+2>deck.questions.length ? 0 : 1,
                    correctCnt: prev.correct ? ++prev.correctCnt: prev.correctCnt
                }});

                this.scrollView.setNativeProps({ scrollEnabled: true });

                const win = Dimensions.get('window');
                Animated.timing(nextCardDrag, {
                    toValue: {x:-(win.width), y:0},
                    duration: 400,
                    easing:Easing.out(Easing.quad)
                }).start( this.next )
            }
        });

        Dimensions.addEventListener('change', this.dimensionsChanged);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionsChanged);
    }

    dimensionsChanged = (e) => {
        this.setState({ width: e.window.width, height:e.window.height });
    }

    answerPressed = () => {
        // small animation to help emphasis card content updated // 'flipped'
        const { scale } = this.state;
        scale.setValue(.8);
        this.setState((prev) => { return{ display:prev.display==='question' ? 'answer' : 'question' }});
        Animated.timing(scale, {duration:400, toValue:1, easing: Easing.out(Easing.back(2))}).start();
    }

    correctPressed = () => {
        this.setState({ correct:true, statusClr:lightgreen });
        this.showNextisAvailible();
    }

    incorrectPressed = () => {
        this.setState({ correct:false, statusClr:statusgray });
        this.showNextisAvailible();
    }

    showNextisAvailible = () => {
        // highlight status of correct // ani in dragger tab
        const { nextCardOpacity } = this.state;
        Animated.timing(nextCardOpacity, {duration:400, toValue:1}).start();
    }

    next = () => {
        const { nextCardOpacity, nextCardDrag } = this.state;

        this.setState((prev) => {
            return {
                display: 'question',
                current: ++prev.current,
                correct: false,
                statusClr: white
            }
        });

        // reset next cards ani
        nextCardOpacity.setValue(0);
        nextCardDrag.setValue({x:0, y:0});
    }

    restartPressed = () => {
        this.setState((prev) => {
            return {
                display: 'question',
                correctCnt: 0,
                current: 0,
                correct: false,
                statusClr: white,
                btnsOpacity: 1
            }
        });
    }

    backPresed = () => {
        this.props.navigation.goBack();
    }

    setCardContent = (cardContent, display) => {
        const { correctCnt } = this.state;
        const deck = this.props.navigation.state.params.deck;
        if(cardContent){
            return <Text style={ styles.cardTxt }>{ cardContent[display] }</Text>
        }else {
            return <View>
                <Text style={[ styles.title, {textAlign:'center'} ]}> Results </Text>
                <Text style={ styles.title }>
                    You got <Text style={styles.bold}>{ correctCnt }</Text> out of <Text style={styles.bold}>{ deck.questions.length }</Text> correct
                </Text>
            </View>
        }
    }

    render() {
        const { current, display, scale, nextCardDrag, nextCardOpacity, statusClr, btnsOpacity, width, height } = this.state;
        const deck = this.props.navigation.state.params.deck;
        const card = this.setCardContent(deck.questions[current], display);
        const cardNext = this.setCardContent(deck.questions[current+1], 'question');
        const quesTotal = deck.questions.length;
        const cardCnt = current+1>quesTotal ? quesTotal : current+1;

        // fade the current card out as new card dragged in
        const cardOpacity = nextCardDrag.x.interpolate({
            inputRange: [-(width-150), 0 ],
            outputRange: [0, 1]
        });

        return (
            <ScrollView style={[styles.appBackground, {flex:1} ]} ref={(c) => { this.scrollView = c }}>

                <View style={[{flex: 1, minHeight:height*.6}]}>
                    <View style={[ styles.container, {flex: 0} ]}>
                        <Text style={[styles.cardCnt, styles.paddingTop]}>{ `${cardCnt} of ${quesTotal}` }</Text>
                    </View>

                    <View style={[{flex: 1}, styles.stretchSelf]}>
                        <Animated.View style={[{flex: 1}, { transform:[{ scale }], opacity:cardOpacity}]}>
                            <View style={ styles.container }>
                                <Card style={[ styles.marginBottom, { backgroundColor:statusClr } ]} onPress={ this.answerPressed } >
                                    { card }
                                </Card>
                            </View>
                        </Animated.View>

                        <Animated.View
                        style={[styles.cardNext, { opacity:nextCardOpacity, width:width+60 },
                        {transform: nextCardDrag.getTranslateTransform()} ]}
                        {...this.panResponder.panHandlers}
                        >
                            <View style={ styles.container }>
                                <View style={[styles.center, styles.cardNextButton]}>
                                    <MaterialCommunityIcons name='drag-horizontal' size={30} color={ white } />
                                    <Text style={ styles.buttonText }>Next </Text>
                                    <MaterialCommunityIcons name='drag-horizontal' size={30} color={ white } />
                                </View>

                                <Card style={[ styles.stretchSelf, styles.marginBottom, {marginLeft:60} ]}>
                                    { cardNext }
                                </Card>
                            </View>

                        </Animated.View>
                    </View>
                </View>

                <View style={[ styles.container, { minHeight:height*.3 } ]}>

                    <View style={[ {flex:1, backgroundColor:lightgray, opacity:btnsOpacity } ]}>
                        <View style={ styles.center }>
                            <Button label={display==='question' ? 'Show Answers' : 'Show Question' } onPress={ this.answerPressed } />
                        </View>

                        <View style={ [styles.flexRow] }>
                            <TouchableOpacity style={styles.correctBtn} onPress={ this.correctPressed }>
                                <View style={[styles.btnCircle, styles.btnCircleCorrect]}>
                                    <FontAwesome name='smile-o' color={white} size={24} />
                                </View>
                                <Text style={ styles.correctBtnTxt }>Correct</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.correctBtn} onPress={ this.incorrectPressed }>
                                <View style={[styles.btnCircle, styles.btnCircleIncorrect]}>
                                    <FontAwesome name='meh-o' color={white} size={24} />
                                </View>
                                <Text style={ styles.incorrectBtnTxt }>Incorrect</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Restart Quiz' and 'Back to Deck */}
                    {btnsOpacity===0 && <View style={[ styles.quizCompletedBtns, styles.center ]}>
                        <Button label="Back to deck" onPress={ this.backPresed } />
                        <Button label="Restart Quiz" onPress={ this.restartPressed } />
                    </View> }

                </View>

            </ScrollView>

        )
    }
}

function mapStateToProps ({ decks }) {
    return { decks };
}

export default connect(mapStateToProps)(Quiz);
