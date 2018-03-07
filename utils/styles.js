import { StyleSheet } from 'react-native';


export const lightgray = '#E6E6FF';
export const statusgray = '#D4D4D4';
export const midgray = '#CECEBF';
export const gray = '#666666';
export const orange = '#FFA64D';
export const darkorange = '#99642E';
export const blue = '#247fc1';
export const green = '#00B200';
export const lightgreen = '#CEFFCE';
export const white = '#fff';
export const black = '#000';
export const pink = '#ebcccc';
export const lightblue = '#d9edf7';


export default StyleSheet.create({
    appBackground:{
        backgroundColor: lightgray
    },
    container: {
        flex: 1,
        paddingLeft:20,
        paddingRight:20
    },
    flexRow:{
        flexDirection: 'row'
    },
    stretchSelf:{
        alignSelf:'stretch'
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    paddingTop:{
        paddingTop:20
    },
    marginTop:{
        marginTop:20
    },
    marginBottom:{
        marginBottom:20
    },
    title: {
        fontSize: 24,
        padding: 20
    },
    input: {
        marginBottom: 20,
        padding: 20,
        borderColor: gray,
        borderWidth: 1,
        borderRadius:5,
        backgroundColor:white,
        fontSize: 18
    },
    button: {
        backgroundColor: orange,
        padding: 15,
        marginBottom: 20,
        marginLeft: 5,
        marginRight:5,
        borderRadius:5,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonDisabled:{
        backgroundColor: midgray,
    },
    buttonText:{
        color: white,
        fontSize:18
    },

    decksListItem:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        minHeight:200,
        backgroundColor: white,
        borderRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        marginTop:20,
        paddingLeft:40,
        paddingRight:40,
    },
    cardTxt:{
        fontSize: 24
    },
    cardCnt:{
        fontSize: 18,
        color:gray,
        textAlign:'center'
    },
    cardNext:{
        position:'absolute',
        width:'100%',
        height:'100%',
        left:'100%',
        marginLeft:-60,
        overflow:'visible'
    },
    cardNextButton:{
        backgroundColor:orange,
        width:80,
        height:120,
        position:'absolute',
        left:0,
        top:'50%',
        marginTop:-50,
        paddingRight:20,
        borderBottomLeftRadius:5,
        borderTopLeftRadius:5
    },
    correctBtn:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'stretch'
    },
    correctBtnTxt:{
        color:green,
        fontSize: 20,
        marginBottom:20,
        textAlign:'center'
    },
    incorrectBtnTxt:{
        color:gray,
        fontSize: 20,
        marginBottom:20,
        textAlign:'center'
    },
    btnCircle:{
        width:44,
        height:44,
        borderRadius: 22,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCircleCorrect:{
        backgroundColor:green
    },
    btnCircleIncorrect:{
        backgroundColor:gray
    },
    callout:{
        backgroundColor: blue,
        borderRadius:10,
        padding: 15,
        color:white,
        fontSize: 18,
    },
    bold:{
        fontWeight:'bold'
    }
});