// Datos de productos (ejemplo)
const products = [
    { id: 1, name: 'Smartwatch Ultrafino', price: 199.99 },
    { id: 2, name: 'Audífonos Bluetooth', price: 89.99 },
    { id: 3, name: 'Cámara Réflex Profesional', price: 1200.00 },
    { id: 4, name: 'Laptop Ultraligera', price: 950.50 },
    { id: 5, name: 'Teléfono Móvil Gama Alta', price: 799.00 },
    { id: 6, name: 'Tablet con Stylus', price: 450.00 }
];

// Extraer nombres y precios
const productNames = products.map(({ name }) => name);
const productPrices = products.map(({ price }) => price);

// Colores dinámicos para cada barra
const baseColors = [
    '54, 162, 235',
    '255, 99, 132',
    '255, 206, 86',
    '75, 192, 192',
    '153, 102, 255',
    '255, 159, 64'
];
const backgroundColors = productNames.map((_, i) =>
    `rgba(${baseColors[i % baseColors.length]}, 0.7)`
);

// Inicializar gráfico solo si el elemento existe
const chartElem = document.getElementById('catalogChart');
if (chartElem) {
    const ctx = chartElem.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Precio en USD',
                data: productPrices,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(0,0,0,0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Catálogo de Productos - Precios'
                },
                tooltip: {
                    callbacks: {
                        label: context => `USD $${context.parsed.y.toFixed(2)}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Precio (USD)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Producto'
                    }
                }
            }
        }
    });
}
