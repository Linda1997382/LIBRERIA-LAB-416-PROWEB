$(document).ready(function() {
    // Obtener referencias a los botones
    let btnBueno = $("#btn-bueno");
    let btnNeutral = $("#btn-neutral");
    let btnMalo = $("#btn-malo");

    // Agregar oyentes de eventos a los botones
    btnBueno.click(function() {
        alert("¡Gracias por tu opinión! 😊");
    });

    btnNeutral.click(function() {
        alert("¡Gracias por tu opinión! 🙂");
    });

    btnMalo.click(function() {
        alert("¡Gracias por tu opinión! 😔");
    });
});
