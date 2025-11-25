# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["api.csproj", "./"]
RUN dotnet restore "api.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy published app
COPY --from=publish /app/publish .

# Expose port 8080 for Render
EXPOSE 8080

# Set environment variable for Render
ENV ASPNETCORE_URLS=http://+:8080

# Run migrations and start the app
ENTRYPOINT ["dotnet", "api.dll"]

