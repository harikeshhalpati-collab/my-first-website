
console.log("JS Connected Successfully ✅");
function calculateFare() {
  const distanceInput = document.getElementById("distance");
  const resultBox = document.getElementById("fareResult");

  if (!distanceInput || !resultBox) {
    alert("Distance input or result box missing ❌");
    return;
  }

  let distance = distanceInput.value;

  if (distance === "" || distance <= 0) {
    alert("Please enter valid distance");
    return;
  }

  const rate = 12; // ₹ per km
  const fare = distance * rate;

  resultBox.innerText = "Estimated Fare: ₹" + fare;
}

// =============================
// BOOKING FORM (FLASK CONNECTED)
// =============================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      pickup: this[0].value,
      drop: this[1].value,
      datetime: this[2].value,
      carType: this[3].value,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.message || "Ride booked!");

      this.reset();
    } catch (error) {
      alert("❌ Server not running or connection error");
      console.error(error);
    }
  });
}

// =============================
// CONTACT FORM
// =============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: this[0].value,
      email: this[1].value,
      message: this[2].value,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.message || "Message sent!");

      this.reset();
    } catch (error) {
      alert("❌ Error sending message");
      console.error(error);
    }
  });
}

// =============================
// NAVBAR SCROLL EFFECT
// =============================
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  } else {
    nav.style.boxShadow = "none";
  }
});
// Auto fare calculation
function autoCalculateFare() {
  let distance = document.getElementById("distance").value;
  let passengers = document.getElementById("passengers").value;

  if(distance > 0 && passengers > 0){
    let rate = 12;
    let fare = distance * rate * passengers;

    document.getElementById("totalFare").value = "₹" + fare;
  } else {
    document.getElementById("totalFare").value = "";
  }
}

// Trigger calculation automatically
document.getElementById("distance").addEventListener("input", autoCalculateFare);
document.getElementById("passengers").addEventListener("input", autoCalculateFare);