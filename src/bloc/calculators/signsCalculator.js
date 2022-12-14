import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { convertCalcState, getPrice } from '../../services/services.js';
import data from '../../services/pricing.json';
import { bannerPostWorkCh, coloredCh, faceColorCh, heightCh, lightCh, sideColorCh, signMaterialCh, signTypeCh, sizeCh, typeCh, widthCh, wordCh } from '../../store/signSlice.js';
import { orDetailsCh, orPriceCh, orTypeCh } from '../../store/orderSlice';


const SignsCalculator = (props) => {
    const {isAuth} = useSelector(state=>state.auth)
    const calculator = useSelector(state => state.sign.calculator);
    const {signType, type, colored, sideColor, faceColor, word, size, width, height, signMaterial, bannerPostWork} = calculator;

    
    const dispatch = useDispatch();

    if (getPrice(calculator, data.pricing)) {
        dispatch(orPriceCh(getPrice(calculator, data.pricing)))
    }

    const content = {
        'letter' : {
            left : <LetterCalcBlock />,
            right : <LetterDescrBlock calcState = {calculator}/>,
            style : {
                textShadow: type === 'volume' ? `1px 1px 1px ${sideColor},1px 2px 1px ${sideColor},1px 3px 1px ${sideColor},1px 4px 1px ${sideColor},1px 5px 1px ${sideColor},1px 6px 1px ${sideColor},1px 7px 1px ${sideColor},1px 8px 1px ${sideColor},1px 9px 1px ${sideColor},1px 10px 1px ${sideColor},1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)` : '1px 1px 1px #FFFAFA,1px 2px 1px 	#FFFAFA,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)',
                lineHeight: '1.2',
                fontSize: '100px',
                fontWeight: '700',
                fontFamily: '\'Ubuntu\', sans-serif',
                color: `${faceColor}`,
                WebkitTextStroke: `${colored === 'stroke' ? '3px white' : ''}`,
                marginBottom: '0.3em',
                padding: '0 20px 70px 40px',
            },
            fields:{signType, type, colored, sideColor, faceColor, word, size},
        },
        'uv' : { 
            left : <SignCalcBlock/>,
            right: <SignDescrBlock calcState = {calculator}/>,
            style : {
                width: '300px',
                height: '200px',
                backgroundImg: 'url("icons/logo_main.png") center no-repeat',
                backgroundColor: 'white',
                border: '2px #4d897c solid',
                borderRadius: '7px',
            },
            fields:{signType, width, height, signMaterial},
            
        },
        'banner' : {
            left : <BannerCalcBlock/>,
            right: <BannerDescrBlock calcState = {calculator}/>,
            style : {
                width: '300px',
                height: '200px',
                background: 'url("icons/logo_main.png") center no-repeat',
                border: '2px #4d897c solid',
                borderRadius: '3px',
            },
            fields: {signType, width, height, bannerPostWork},
        },
        '' : {
            left: <></>,
            right:<></>,
        },
    };   

    const handleOrderDetails = () => {  
        signType && dispatch(orDetailsCh({...content[signType].fields}));
    };

    const handleSignType = (e) => {
        dispatch(signTypeCh(e.target.value));

    }

    console.log(signType);

    return(
        <div className="calculator fadein">
            <h3 className = "mb-4">??????????????????????</h3>
            <div className="calculator__group">
                <div className="calculator__input">
                    <div className="input-group mb-3">
                        <label className="input-group-text w-40" htmlFor="inputGroupSelect01">?????? ??????????????</label>
                        <select value={signType} onChange={handleSignType} className="form-select" id="" disabled={props.blocked}>
                            <option defaultValue=""/>
                            <option value="letter">???????????????? ??????????</option>
                            <option value="uv">???????????????? ?? ????-??????????????</option>
                            <option value="banner">???????????? 440</option>
                        </select>
                    </div>
                        
                    {content[signType].left}
                       
                </div>
                <div className="calculator__render">
                    <div className="calculator__render_img" style={content[signType].style}>{signType === 'letter' ? word : ''}</div>
                    <div className = "calculator__render_description">{content[signType].right}
                        {!isAuth ? 
                                <span className="Calculator_auth">
                                    ?????? ???????????????????? ???????????? ???????????????????? <a href="/personal">??????????</a>
                                </span>
                            : !signType ?
                                <span className="Calculator_auth">
                                    ???????????????? ?????????????????? ????????????
                                </span> :
                                <button 
                                    className="calculator__order-btn"
                                    children="?????????????????? ??????????"
                                    onClick={() => {
                                        handleOrderDetails();
                                        props.handleResume(true)
                                    }}/> 
                        } 
    
                    </div>     
                </div>
            </div>
                
        </div>
    );
    
};

const LetterDescrBlock= (props) => {
   

    const {type, light, sideColor, faceColor, word, size} = useSelector(state=>state.sign.calculator);


    return(
           
        <>
            <span>{+light && type!=='plate' ? '????????????????': '???? ????????????????'} {type === 'volume' ? '????????????????' : '??????????????'} ?????????? "{word}"</span>
            <ul>
                <li> ?????????????? ???????????? ??????????: {size} ???? </li>
                <li> ???????????? ??????????????: {+size*(word.length)} ????</li>
                <li> ???????? ??????????????: {convertCalcState(sideColor)}</li>
                <li> ???????? ?????????????? ??????????: {convertCalcState(faceColor)}</li>
                <li> ????????????: ?????????????????????? ?????????? 15??15??1,5???? </li>
            </ul>
            <span>???????????????? ?????????????????? (?????? ?????????? ??????????????): {
                getPrice(props.calcState, data.pricing) } ??????</span>
        </>
            
    );
    
};

const LetterCalcBlock = () =>  {
    
    const dispatch = useDispatch();
    const {type, light, colored, sideColor, faceColor, word, size} = useSelector(state=>state.sign.calculator);

    
    return(
        <>
            <div className="input-group mb-3">
                <label className="input-group-text w-40" htmlFor="inputGroupSelect01">????????????????????</label>
                <select value={type} onChange={(e) => dispatch(typeCh(e.target.value))}  className="form-select" id="">
                    <option  defaultValue="" children= "???? ????????????"/>
                    <option value="plate">???? ?????? 8????</option>
                    <option value="volume">????????????????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text w-40" htmlFor="inputGroupSelect01">??????????????????</label>
                <select value={light} onChange={(e) => dispatch(lightCh(e.target.value))} className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>
                    <option value={1}>?? ????????????????????</option>
                    <option value={0}>?????? ??????????????????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text w-40" htmlFor="inputGroupSelect01">?????????????? ??????????</label>
                <select value={colored} onChange={(e) => dispatch(coloredCh(e.target.value))} className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>
                    <option value="full">????????????????</option>
                    <option value="stroke">?? ????????????????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">???????? ?????????????? ??????????</label>
                <select value={sideColor} onChange={(e) => dispatch(sideColorCh(e.target.value))} className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>
                    <option value="lightgrey"> ??????????</option>
                    <option value="black"> ????????????</option>
                    <option value="crimson"> ??????????????</option>
                    <option value="tomato"> ??????????????????</option>
                    <option value="gold"> ????????????</option>
                    <option value="darkolivegreen"> ??????????????</option>
                    <option value="midnightblue"> ??????????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">???????? ?????????????? ??????????</label>
                <select value ={faceColor} onChange={(e) => dispatch(faceColorCh(e.target.value))} className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>
                    <option value="white"> ??????????</option>
                    <option value="black"> ????????????</option>
                    <option value="red"> ??????????????</option>
                    <option value="orange"> ??????????????????</option>
                    <option value="yellow"> ????????????</option>
                    <option value="green"> ??????????????</option>
                    <option value="navy"> ??????????</option>
                </select>
            </div>
           

            <label className="input_definition">????????????????</label>
            <input value={word} onChange={(e) => dispatch(wordCh(e.target.value))} type="text" className="form-control" aria-label="Sizing example input"          aria-describedby="inputGroup-sizing-sm" placeholder="?????????????? ????????????????"/>
            <label className="input_definition mt-2">???????????? ??????????</label>
            <input value={size} onChange={(e) => dispatch(sizeCh(e.target.value))} type="text" className="form-control" aria-label="Sizing example input"          aria-describedby="inputGroup-sizing-sm" placeholder="?????????????? ???????????? ??????????, c??"/>
        </>
    );

};

const BannerDescrBlock = (props) => {
        
    const { width, height, bannerPostWork} = useSelector(state=>state.sign.calculator);
        

    return(
        <>
            <span>???????????? ???????????????????? 440????/??.????.</span>
            <ul>
                <li> ????????????: {width} ????</li>
                <li> ??????????: {height} ????</li>
                <li> ?????????????????? ?? ??????????????: {bannerPostWork ? '????????' : '??????'}</li>

            </ul>
            <span>???????????????? ?????????????????? (?????? ?????????? ??????????????): {
                getPrice(props.calcState, data.pricing) } ??????</span>
        </>
    );
    
};

const BannerCalcBlock = () => {
    const { width, height, bannerPostWork} = useSelector(state=>state.sign.calculator);
    const dispatch = useDispatch();

    return(
        <>
            <label className="input_definition">????????????</label>
            <input value={width} onChange={(e) => dispatch(widthCh(e.target.value))} type="text" className="form-control"  placeholder="?????????????? ????????????, ????"/>
            <label className="input_definition mt-2">????????????</label>
            <input value = {height} onChange={(e) => dispatch(heightCh(e.target.value))} type="text" className="form-control"  placeholder="?????????????? ??????????, c??"/> 
            <div className="input-group mt-3">
                <label className="input-group-text w-40" htmlFor="inputGroupSelect01">???????? ??????????????????</label>
                <select value={bannerPostWork} onChange={(e) => dispatch(bannerPostWorkCh(e.target.value))}  className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>                        
                    <option value="1">?????????????????? + ?????????????? ???? ??????????????</option>
                    <option value="0">?????? ??????????????????</option>
                </select>
            </div>
        </>
    );
    
};

const SignDescrBlock = (props) => {
    
    const {width, height, signMaterial} = useSelector(state=>state.sign.calculator);
    return(
        <>
            <span>???????????????? ?? ????-??????????????</span>
            <ul>
                <li> ????????????: {width} ????</li>
                <li> ??????????: {height} ????</li>
                <li> ????????????????: {convertCalcState(signMaterial)}</li>

            </ul>
            <span>???????????????? ?????????????????? (?????? ?????????? ??????????????): {
                getPrice(props.calcState, data.pricing) } ??????</span>
        </>
    );
    
};

const SignCalcBlock = () => {
    const {width, height, signMaterial} = useSelector(state=>state.sign.calculator);
    const dispatch = useDispatch();

    return(
        <>
            <label className="input_definition">????????????</label>
            <input value={width} onChange={(e) => dispatch(widthCh(e.target.value))} type="text" className="form-control" aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-sm" placeholder="?????????????? ????????????, ????"/>
            <label className="input_definition mt-2">????????????</label>
            <input value={height} onChange={(e) => dispatch(heightCh(e.target.value))} type="text" className="form-control" aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-sm" placeholder="?????????????? ??????????, c??"/> 
            <div className="input-group mt-3">
                <label className="input-group-text w-40" htmlFor="inputGroupSelect01">????????????????</label>
                <select value={signMaterial} onChange={(e) => dispatch(signMaterialCh(e.target.value))}  className="form-select" id="">
                    <option defaultValue="" children= "???? ????????????"/>
                    <option value="PVC3">?????????????? ?????? 3????</option>
                    <option value="PVC5">?????????????? ?????? 5????</option>
                    <option value="ACP3">?????????????????????? ?????????????????????? ???????????? 3????</option>
                </select>
            </div>
        </>
    );
    
};

export default SignsCalculator;