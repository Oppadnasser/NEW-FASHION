import { useLocation } from "react-router-dom";

export default function ProductPage(props){
    const location = useLocation();
    // const info = location.state;
    const {productInfo} = location.state;
    // const productInfo={
    //     Pname:props['name'],
    //     describtion: props['describtion'],
    //     price:props['price'],
    //     evaluation:props['evaluation'],
    //     evaluatorNumber:props['evaluationNumber'],
    //     availabelQ:props['availabelQ'],
    //     picture:props['picture'],
    //     companyName:props['companyName'],
    //     Shipping_expenses:props['Shipping_expenses']
    // };  
    console.log('object is ' , productInfo);
    const starPercentage = ( productInfo.evaluation/ 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <div className="product-page">
            
            <div className="product-information">
                <p id='product-describtion'>{productInfo.describtion}</p>
                <p id='brand' >Brand : {productInfo.companyName}</p>
                <div id="rats">
                    <p id='number-ratings'> Rats {productInfo.evaluatorNumber}</p>
                    <p id="the-rate">{productInfo.evaluation.toFixed(1)}</p>
                    <div class="stars-outer">
                        <div class="stars-inner"  style={{ width: starPercentageRounded }}></div>
                    </div>    
                </div>
                <hr/>
                <h1 className="price">{numberWithCommas(productInfo.price)} eg</h1>
                <h5>the Shipping expenses {productInfo.Shipping_expenses} eg</h5><br/>
                <hr/>
                <h3 id="aboutItem">About this Item</h3>

            </div>

            <div className="div-photo">
                <img className="product-photo"  src={productInfo.picture} alt=""/>
            </div>
        </div>
    )
}