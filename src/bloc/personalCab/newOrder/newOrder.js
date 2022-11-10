import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PolygraphyCalc from '../../screens/polygraphy/polygraphyCalculator';
import { PolygraphyOrder } from './polygraphyOrder';

import SignsCalculator from '../../screens/signs/signsCalculator';
import { resetSign, signTypeCh } from '../../../store/signSlice';
import { orTypeCh, orDetailsCh, orReset } from '../../../store/orderSlice';
import { useCreateOrder } from './createOrder';
import { useCreateOrderMutation } from '../../../store/api/orderApi';
import { sMessageCh } from '../../../store/sMessageSlice';
import { resetPolyg } from '../../../store/polygraphySlice';
import { redirect, useNavigate } from "react-router-dom";




const NewOrder = () => {
    const [resume, setResume] = useState(false)
    
    // const polygDetails = useSelector(state => state.polygraphy)
    const { orType } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderData = useCreateOrder();
    const [createOrder] = useCreateOrderMutation();

    

    const handleResume = (v) => {
        setResume(v)
    }
    let active = orType;

    const handleSetActive = (state) => {
        dispatch(orTypeCh(state));
        if(state !== 'polyg')dispatch(signTypeCh(state));
    }
            
    const handleActiveClass = (state) => {
        if(active !== state) {
            return 'new-order__block'
        }  else {
            return 'new-order__block new-order__block_active'
        } 
    };

    const handleCreateOrder = async () => {
        if (!orderData){
            return dispatch(sMessageCh('Введите все данные'));  
        }
        await createOrder(orderData);
        dispatch(orReset());
        dispatch(resetPolyg());
        dispatch(resetSign());
        setResume(false);

        return navigate('/personal')

    } 

    const handleConfirmStyle = () => {
        if(!orderData){
            return {
                display: 'none'
            }
        } else {
            return {
                display: 'block'
            }
        }
    }

        
    const signCalculator = <SignsCalculator blocked={!!orType} handleResume = {handleResume}/>
    const polygraphyCalc = <PolygraphyCalc handleResume = {handleResume}/>
    
    let content = {
        'uv': {calc: signCalculator, 'order': <PolygraphyOrder handleResume = {handleResume}/>},
        'banner': {calc: signCalculator, 'order': <PolygraphyOrder handleResume = {handleResume}/>},
        'letter': {calc: signCalculator, 'order': <PolygraphyOrder handleResume = {handleResume}/>},
        'polyg': {calc: polygraphyCalc, 'order': <PolygraphyOrder handlerResume = {handleResume}/>},
        '':{calc: <></>, 'order': <></>}

    };
    return(
        <div className="new-order">
            <div className="container">
                <div className="new-order__heading">Новый заказ:</div>
                <div className="new-order__wrapper">
                    <div className={handleActiveClass('polyg')} onClick={() =>  handleSetActive('polyg')}>Полиграфия</div>
                    <div className={handleActiveClass('uv')} onClick={() =>  handleSetActive('uv')}>УФ печать</div>
                    <div className={handleActiveClass('banner')} onClick={() =>  handleSetActive('banner')}>Баннер</div>
                    <div className={handleActiveClass('letter')} onClick={() =>  handleSetActive('letter')}>Вывеска</div>    
                </div>
                
                {!!active && content[active].calc}
                {resume && content[active].order}

                <button 
                    className="new-order__confirm"
                    children="Оформить заказ"
                    onClick={handleCreateOrder}
                    style = {handleConfirmStyle()}
                />
            </div>
            
        </div>
    );
};






export default NewOrder;