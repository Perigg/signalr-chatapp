using signalr_chatapp.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5274); // HTTP
    options.ListenAnyIP(7152, listenOptions =>
    {
        listenOptions.UseHttps(); // HTTPS
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();

app.MapHub<ChatHub>("/chathub");

app.Run();
