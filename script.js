const card_list = document.getElementsByClassName("card");
const added_list = document.getElementById("items");
const total_price = document.getElementById("total-price");
const discount = document.getElementById("discount-price");
const final_total = document.getElementById("total");
const make_purchase_btn = document.getElementById("make-purchase-btn");
const coupon_submit_btn = document.getElementById("coupon-submit-btn");
const my_modal = document.getElementById("my_modal_2");
const home_btn = document.getElementById("home_btn");
let discountEnabled = false;
coupon_submit_btn.addEventListener("click", function (event) {
    const input = document.getElementById("input");
    if (input.value === "SELL200") {
        discountEnabled = true;
        const finalTotal = parseFloat(final_total.innerText);
        const discount_p = finalTotal * 0.2;
        discount.innerText = discount_p.toFixed(2);
        final_total.innerText = (finalTotal - discount_p).toFixed(2);
        input.value = "";
        coupon_submit_btn.setAttribute("disabled", true);
    }
});
make_purchase_btn.addEventListener("click", function (event) {
    my_modal.showModal();
});
home_btn.addEventListener("click", function () {
    window.location.href = "index.html";
});
for (const card of card_list) {
    card.addEventListener("click", function (event) {
        const productNameEl = card.querySelector(".card-title");
        const productPriceEl = card.querySelector("#product-price");
        const productName = productNameEl.innerText;
        const productPrice = parseFloat(productPriceEl.innerText);
        // console.log(productName, productPrice);
        const li = document.createElement("li");
        li.innerText = productName;
        added_list.appendChild(li);
        const totalPrice = parseFloat(total_price.innerText) + productPrice;
        total_price.innerText = totalPrice.toFixed(2);
        let discountPrice = 0;
        if (discountEnabled) {
            discountPrice = totalPrice * 0.2;
            discount.innerText = discountPrice.toFixed(2);
        }
        const finalTotal = totalPrice - discountPrice;
        final_total.innerText = finalTotal.toFixed(2);
        if (finalTotal > 0) {
            make_purchase_btn.removeAttribute("disabled");
        }
        if (finalTotal >= 200 && !discountEnabled) {
            coupon_submit_btn.removeAttribute("disabled");
        }
    });
}
