
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine3.19-amd64 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.19-amd64 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["./PortfolioBackend.csproj", "PortfolioBackend/"]
RUN dotnet restore "./PortfolioBackend/PortfolioBackend.csproj"
COPY . .
WORKDIR "/src/PortfolioBackend"
RUN dotnet build "./PortfolioBackend.csproj" -c %BUILD_CONFIGURATION% -o /app/build


FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PortfolioBackend.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PortfolioBackend.dll"]