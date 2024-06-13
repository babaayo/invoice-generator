function addItem() {
    const itemsDiv = document.getElementById('items');
    const newItemDiv = document.createElement('div');
    newItemDiv.className = 'item';
    newItemDiv.innerHTML = `
        <label>Item Description:</label>
        <input type="text" class="itemDescription" required>
        <label>Quantity:</label>
        <input type="number" class="itemQuantity" required>
        <label>Unit Price:</label>
        <input type="number" class="itemPrice" required>
    `;
    itemsDiv.appendChild(newItemDiv);
}

function generateInvoice() {
    const invoiceTitle = document.getElementById('invoiceTitle').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const issueDate = document.getElementById('issueDate').value;
    const dueDate = document.getElementById('dueDate').value;
    const companyName = document.getElementById('companyName').value;
    const companyLogo = document.getElementById('companyLogo').files[0];
    const companyAddress = document.getElementById('companyAddress').value;
    const companyPhone = document.getElementById('companyPhone').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const taxId = document.getElementById('taxId').value;
    const clientName = document.getElementById('clientName').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const items = document.getElementsByClassName('item');
    const paymentMethods = document.getElementById('paymentMethods').value;
    const bankDetails = document.getElementById('bankDetails').value;
    const paymentInstructions = document.getElementById('paymentInstructions').value;
    const paymentTerms = document.getElementById('paymentTerms').value;
    const latePaymentPenalties = document.getElementById('latePaymentPenalties').value;
    const returnRefundPolicy = document.getElementById('returnRefundPolicy').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const supportContact = document.getElementById('supportContact').value;

    let itemsHtml = '';
    let subtotal = 0;

    Array.from(items).forEach(item => {
        const description = item.querySelector('.itemDescription').value;
        const quantity = parseInt(item.querySelector('.itemQuantity').value);
        const unitPrice = parseFloat(item.querySelector('.itemPrice').value);
        const total = quantity * unitPrice;
        subtotal += total;

        itemsHtml += `
            <tr>
                <td>${description}</td>
                <td>$${unitPrice.toFixed(2)}</td>
                <td>${quantity}</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;
    });

    const taxes = subtotal * 0.1; // Example tax rate
    const totalAmountDue = subtotal + taxes;

    const reader = new FileReader();
    reader.onload = function (e) {
        const invoiceOutput = document.getElementById('invoiceOutput');
        invoiceOutput.innerHTML = `
            <div class="invoice" id="invoiceContent">
                <div class="invoice-header">
                    <div>
                        ${companyLogo ? `<img src="${e.target.result}" alt="Company Logo" style="max-width: 150px;">` : ''}
                    </div>
                    <div>
                        <p class="invoice-details"><strong>Company Name:</strong> ${companyName}</p>
                        <p class="invoice-details"><strong>Address:</strong> ${companyAddress}</p>
                        <p class="invoice-details"><strong>Phone Number:</strong> ${companyPhone}</p>
                        <p class="invoice-details"><strong>Email:</strong> ${companyEmail}</p>
                        <p class="invoice-details"><strong>Tax ID:</strong> ${taxId}</p>
                    </div>
                    <div>
                        <h1 class="invoice-title">${invoiceTitle}</h1>
                        <p class="invoice-number"><strong>Invoice Number:</strong> ${invoiceNumber}</p>
                        <p class="invoice-date"><strong>Date of Issue:</strong> ${issueDate}</p>
                        <p class="invoice-date"><strong>Due Date:</strong> ${dueDate}</p>
                    </div>
                </div>
                <div class="invoice-section">
                    <h3>Buyer Information</h3>
                    <p class="invoice-details"><strong>Client Name:</strong> ${clientName}</p>
                    <p class="invoice-details"><strong>Address:</strong> ${clientAddress}</p>
                    <p class="invoice-details"><strong>Phone Number:</strong> ${clientPhone}</p>
                    <p class="invoice-details"><strong>Email:</strong> ${clientEmail}</p>
                </div>
                <div class="invoice-section">
                    <h3>Description of Goods/Services</h3>
                    <table class="invoice-items">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="invoice-summary">
                    <table>
                        <tr>
                            <td><strong>Subtotal:</strong></td>
                            <td>$${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>Taxes:</strong></td>
                            <td>$${taxes.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Amount Due:</strong></td>
                            <td>$${totalAmountDue.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
                <div class="invoice-section">
                    <h3>Payment Terms</h3>
                    <p class="invoice-details"><strong>Accepted Payment Methods:</strong> ${paymentMethods}</p>
                    <p class="invoice-details"><strong>Bank Details:</strong> ${bankDetails}</p>
                    <p class="invoice-details"><strong>Payment Instructions:</strong> ${paymentInstructions}</p>
                </div>
                <div class="invoice-section">
                    <h3>Terms and Conditions</h3>
                    <p class="invoice-details"><strong>Payment Terms:</strong> ${paymentTerms}</p>
                    <p class="invoice-details"><strong>Late Payment Penalties:</strong> ${latePaymentPenalties}</p>
                    <p class="invoice-details"><strong>Return and Refund Policy:</strong> ${returnRefundPolicy}</p>
                </div>
                <div class="invoice-section">
                    <h3>Notes and Special Instructions</h3>
                    <p class="invoice-details">${additionalInfo}</p>
                </div>
                <div class="footer">
                    <p><strong>Support Contact:</strong> ${supportContact}</p>
                </div>
            </div>
            <button onclick="downloadPDF()">Download PDF</button>
            <button onclick="printPDF()">Print PDF</button>
            <button onclick="shareEmail()">Share via Email</button>
        `;
    };

    if (companyLogo) {
        reader.readAsDataURL(companyLogo);
    } else {
        reader.onload();
    }
}

function downloadPDF() {
    const invoiceElement = document.getElementById('invoiceContent');
    const opt = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(invoiceElement).set(opt).save();
}

function printPDF() {
    const invoiceElement = document.getElementById('invoiceContent');
    html2pdf().from(invoiceElement).toPdf().get('pdf').then(function (pdf) {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.src = pdf.output('bloburl');
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
}

function shareEmail() {
    const email = prompt("Enter the recipient's email address:");
    if (email) {
        const subject = "Invoice";
        const body = "Please find the attached invoice.";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
}
