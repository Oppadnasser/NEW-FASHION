import {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Post(props){
    const productInfo={
        Pname:props['name'],
        describtion: props['describtion'],
        price:props['price'],
        evaluation:props['evaluation'],
        evaluatorNumber:props['evaluatorNumber'],
        availabelQ:props['availabelQ'],
        picture:props['picture'],
        companyName:props['companyName'],
        Shipping_expenses:props['Shipping_expenses']
    }
    // const [name,des,price,evaluation,evN,avaQ,picture,company,shippings] = [
    //     productInfo.Pname,
    //     productInfo.describtion,
    //     productInfo.price,
    //     productInfo.evaluation,
    //     productInfo.evaluatorNumber,
    //     productInfo.availabelQ,
    //     productInfo.picture,
    //     productInfo.companyName,
    //     productInfo.Shipping_expenses
    // ];


    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let shipping = productInfo.Shipping_expenses.toFixed(2);

    const starPercentage = ( productInfo.evaluation/ 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return(
        <div className='post'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' alt='' className='company-logo' />
            <Link to='/product-info' state={{productInfo}}>
                <img className='product-picture' src={productInfo.picture} alt="No"/>
            </Link>
            <p className='describtion'>{productInfo.describtion}</p>
            <div class="stars-outer">
                <div class="stars-inner"  style={{ width: starPercentageRounded }}></div>
            </div>
            <h3 className='price'>{numberWithCommas(productInfo.price)} eg</h3>
            <p className='remaining'>remaining {productInfo.availabelQ}</p>
            <p className='shipping'>shipping expenses {shipping} eg</p>
        </div>
    )
}