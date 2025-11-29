// Tax rate configurations for the application
export const TAX_RATES = [
    { value: '0', label: 'No Tax (0%)', rate: 0 },
    { value: '5', label: 'GST 5%', rate: 5 },
    { value: '12', label: 'GST 12%', rate: 12 },
    { value: '18', label: 'GST 18%', rate: 18 },
    { value: '28', label: 'GST 28%', rate: 28 },
];

// Helper function to get tax rate by value
export const getTaxRate = (value) => {
    const tax = TAX_RATES.find(t => t.value === value);
    return tax ? tax.rate : 0;
};

// Helper function to calculate tax amount
export const calculateTaxAmount = (amount, taxRate) => {
    return (amount * taxRate) / 100;
};

// Helper function to calculate total with tax
export const calculateTotalWithTax = (amount, taxRate) => {
    const taxAmount = calculateTaxAmount(amount, taxRate);
    return amount + taxAmount;
};
