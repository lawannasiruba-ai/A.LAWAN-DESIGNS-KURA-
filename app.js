// A. LAWAN DESIGNS - WEBSITE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

  // 1. Automatic current year in footer
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation menu
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
  navMenu.classList.toggle("show");

  const isOpen = navMenu.classList.contains("show");

  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", function (event) {
  if (
    navMenu &&
    menuBtn &&
    !navMenu.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    navMenu.classList.remove("show");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

    // Close menu after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Contact form - open WhatsApp with the customer's message
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !message) {
        alert("Please enter your name and message.");
        return;
      }

      const whatsappNumber = "2348065507628";

      const whatsappMessage =
        "Hello A. LAWAN DESIGNS!%0A%0A" +
        "Customer Name: " + encodeURIComponent(name) + "%0A" +
        "Phone Number: " + encodeURIComponent(phone || "Not provided") + "%0A" +
        "Message: " + encodeURIComponent(message);

      const whatsappURL =
        "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;

      window.open(whatsappURL, "_blank");
    });
  }

});
// COPY PAYMENT ACCOUNT NUMBER
function copyAccount(accountNumber) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(accountNumber)
      .then(function () {
        alert("Account number copied: " + accountNumber);
      })
      .catch(function () {
        fallbackCopy(accountNumber);
      });
  } else {
    fallbackCopy(accountNumber);
  }
}

function fallbackCopy(accountNumber) {
  const input = document.createElement("textarea");
  input.value = accountNumber;
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();

  try {
    document.execCommand("copy");
    alert("Account number copied: " + accountNumber);
  } catch (error) {
    alert("Please copy this account number manually: " + accountNumber);
  }

  input.remove();
}
/* PRICE CALCULATOR */

document.addEventListener("DOMContentLoaded", function () {
  const designType = document.getElementById("designType");
  const quantity = document.getElementById("designQuantity");
  const totalPrice = document.getElementById("totalPrice");
  const orderButton = document.getElementById("calculateOrder");

  if (!designType || !quantity || !totalPrice || !orderButton) {
    return;
  }

  function calculateTotal() {
    const price = Number(designType.value);
    const qty = Math.max(1, Math.min(100, Number(quantity.value) || 1));

    quantity.value = qty;
    totalPrice.textContent = "₦" + (price * qty).toLocaleString("en-NG");
  }

  designType.addEventListener("change", calculateTotal);
  quantity.addEventListener("input", calculateTotal);

  orderButton.addEventListener("click", function () {
    const selectedText = designType.options[designType.selectedIndex].text;
    const qty = Number(quantity.value);
    const total = Number(designType.value) * qty;

    const message =
      "Hello A. LAWAN DESIGNS!%0A" +
      "I want to order a design.%0A" +
      "Design: " + encodeURIComponent(selectedText) + "%0A" +
      "Quantity: " + qty + "%0A" +
      "Estimated Total: " + encodeURIComponent(
        "₦" + total.toLocaleString("en-NG")
      );

    window.open(
      "https://wa.me/2348065507628?text=" + message,
      "_blank"
    );
  });

  calculateTotal();
});
/* AI DESIGN PROMPT ASSISTANT */

document.addEventListener("DOMContentLoaded", function () {
  const type = document.getElementById("aiDesignType");
  const name = document.getElementById("aiBusinessName");
  const colors = document.getElementById("aiColors");
  const description = document.getElementById("aiDescription");
  const generate = document.getElementById("generatePrompt");
  const result = document.getElementById("aiPromptResult");
  const output = document.getElementById("aiPromptOutput");
  const copy = document.getElementById("copyAIPrompt");

  if (!type || !name || !colors || !description ||
      !generate || !result || !output || !copy) {
    return;
  }

  generate.addEventListener("click", function () {
    const businessName = name.value.trim();
    const designDescription = description.value.trim();
    const preferredColors = colors.value.trim() || "Choose colours that suit the design";

    if (!businessName || !designDescription) {
      alert("Please enter the business/event name and describe your idea.");
      return;
    }

    const prompt =
      "Create a professional " + type.value + " design.\n\n" +
      "Business or Event Name: " + businessName + "\n" +
      "Preferred Colours: " + preferredColors + "\n" +
      "Design Requirements: " + designDescription + "\n\n" +
      "STYLE REQUIREMENTS:\n" +
      "- Use a clean, modern, professional layout.\n" +
      "- Apply excellent typography and visual hierarchy.\n" +
      "- Use balanced spacing and attractive colour combinations.\n" +
      "- Make the design readable on mobile screens.\n" +
      "- Ensure all supplied text is spelled correctly.\n" +
      "- Do not invent contact details, prices, or event information.\n" +
      "- Produce a polished, high-quality graphic design.";

    output.value = prompt;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  copy.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(output.value);
      alert("Design prompt copied successfully!");
    } catch (error) {
      output.focus();
      output.select();

      const copied = document.execCommand("copy");
      alert(
        copied
          ? "Design prompt copied successfully!"
          : "Please select and copy the prompt manually."
      );
    }
  });
});
// ===== A. LAWAN DESIGNS INVOICE GENERATOR =====

document.addEventListener("DOMContentLoaded", function () {
    const invoiceNumber = document.getElementById("invoiceNumber");
    const invoiceDate = document.getElementById("invoiceDate");
    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");
    const serviceDescription = document.getElementById("serviceDescription");
    const quantity = document.getElementById("invoiceQuantity");
    const unitPrice = document.getElementById("unitPrice");
    const amountPaid = document.getElementById("amountPaid");

    const invoiceTotal = document.getElementById("invoiceTotal");
    const paidTotal = document.getElementById("paidTotal");
    const balanceDue = document.getElementById("balanceDue");

    // Generate invoice number
    if (invoiceNumber) {
        invoiceNumber.value =
            "ALD-" + Date.now().toString().slice(-8);
    }

    // Set today's date
    if (invoiceDate) {
        invoiceDate.value =
            new Date().toISOString().split("T")[0];
    }

    // Format Nigerian Naira
    function formatNaira(amount) {
        return "₦" + amount.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Calculate invoice
    function calculateInvoice() {
        const qty = Math.max(0, Number(quantity.value) || 0);
        const price = Math.max(0, Number(unitPrice.value) || 0);
        const paid = Math.max(0, Number(amountPaid.value) || 0);

        const total = qty * price;
        const balance = total - paid;

        invoiceTotal.textContent = formatNaira(total);
        paidTotal.textContent = formatNaira(paid);
        balanceDue.textContent = formatNaira(balance);

        balanceDue.style.color =
            balance < 0 ? "#dc2626" : "#166534";
    }

    [quantity, unitPrice, amountPaid].forEach(function (input) {
        input.addEventListener("input", calculateInvoice);
    });

    // Print or save as PDF
    window.printInvoice = function () {
        calculateInvoice();
        window.print();
    };

    // Send invoice details through WhatsApp
    window.sendInvoiceWhatsApp = function () {
        calculateInvoice();

        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();
        const service = serviceDescription.value.trim();

        if (!name || !service) {
            alert("Please enter the customer name and service description.");
            return;
        }

        const qty = Math.max(0, Number(quantity.value) || 0);
        const price = Math.max(0, Number(unitPrice.value) || 0);
        const paid = Math.max(0, Number(amountPaid.value) || 0);
        const total = qty * price;
        const balance = total - paid;

        const message =
`🧾 A. LAWAN DESIGNS
INVOICE

Invoice No: ${invoiceNumber.value}
Date: ${invoiceDate.value}

Customer: ${name}
Phone: ${phone || "Not provided"}

Service: ${service}
Quantity: ${qty}
Unit Price: ${formatNaira(price)}

TOTAL: ${formatNaira(total)}
Amount Paid: ${formatNaira(paid)}
Balance Due: ${formatNaira(balance)}

Thank you for choosing A. LAWAN DESIGNS!
Phone: 08065507628`;

        const whatsappURL =
            "https://wa.me/?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    };

    calculateInvoice();
});
// DOWNLOAD INVOICE AS PNG IMAGE

window.downloadInvoiceImage = async function () {
    const invoice = document.getElementById("invoice");

    if (!invoice) {
        alert("Invoice not found!");
        return;
    }

    if (typeof html2canvas === "undefined") {
        alert("Image tool could not load. Check your internet connection.");
        return;
    }

    try {
      const canvas = await html2canvas(invoice, {
    scale: 3,
    backgroundColor: "#ffffff",
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.scrollWidth,
    onclone: function (clonedDocument) {
        const clonedInvoice =
            clonedDocument.getElementById("invoice");

        clonedInvoice.style.height = "auto";
        clonedInvoice.style.overflow = "visible";

        clonedInvoice.querySelectorAll("input").forEach(function (input) {
            input.style.height = "auto";
            input.style.minHeight = "44px";
            input.style.padding = "12px";
            input.style.boxSizing = "border-box";
            input.style.lineHeight = "1.5";
            input.style.overflow = "visible";
        });
    }
});

        const link = document.createElement("a");

        const customerName =
            document.getElementById("customerName").value.trim()
            || "Customer";

        link.download =
            "ALAWAN-INVOICE-" +
            customerName.replace(/[^a-z0-9]/gi, "-") +
            ".png";

        link.href = canvas.toDataURL("image/png");
        link.click();

    } catch (error) {
        console.error(error);
        alert("An kasa sauke hoton. Ka sake gwadawa.");
    }
};
// Register A. LAWAN DESIGNS Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("A. LAWAN DESIGNS PWA is ready!");
      })
      .catch((error) => {
        console.error("Service Worker error:", error);
      });
  });
}
// A. LAWAN DESIGNS - Install App
let deferredPrompt;

const installBtn = document.getElementById("installAppBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  deferredPrompt = event;

  if (installBtn) {
    installBtn.style.display = "block";
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
      alert(
        "Domin saka A. LAWAN DESIGNS, buɗe menu na Chrome ka zaɓi 'Install app' ko 'Add to Home screen' idan yana nan."
      );
      return;
    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.style.display = "none";
  });
}

window.addEventListener("appinstalled", () => {
  if (installBtn) {
    installBtn.style.display = "none";
  }
});