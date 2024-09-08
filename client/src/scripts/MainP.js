import { useState } from "react";
import Post from "./Post";

export default function MainP(){
    const any = <Post name='TV' describtion ="وحدة تلفزيون ترفيهية جدارية خشبية مصممة بشكل حصري من اومي - علامة تجارية من أمازون، حامل خزانة مع 3 ادراج ورف حائط لغرفة المعيشة (بني)"
    price={2000}
    evaluation={4}
    evaluatorNumber={200}
    availabelQ={2}
    picture='https://m.media-amazon.com/images/I/716mHLcER6L._AC_UL320_.jpg'
    companyName='amazon'
    Shipping_expenses={30} />;

    return(
        <div className="main-page">
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}
            {any}

        
        </div>
    )
}   