using OrderPricing.Api;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PricingEngine>();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapPost("/orders/price", (OrderRequest request, PricingEngine pricing) =>
{
    try
    {
        return Results.Ok(pricing.Price(request));
    }
    catch (ArgumentException exception)
    {
        return Results.BadRequest(new { error = exception.Message });
    }
    catch (OverflowException)
    {
        return Results.BadRequest(new { error = "order amount is too large" });
    }
});

app.Run();
