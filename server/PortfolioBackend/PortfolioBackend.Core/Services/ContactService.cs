using Microsoft.Extensions.Configuration;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;
using System.Net.Mail;
using System.Net;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class ContactService : IContactService
    {
        private readonly IConfiguration _configuration;

        public ContactService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(Contact contact)
        {
            var smtpEmail = _configuration["Smtp:Email"] 
                ?? throw new InvalidOperationException("SMTP email not configured. Set Smtp:Email in configuration.");
            var smtpPassword = _configuration["Smtp:Password"] 
                ?? throw new InvalidOperationException("SMTP password not configured. Set Smtp:Password in configuration.");

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(smtpEmail, smtpPassword),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(contact.Email),
                Subject = "Ayham Portfolio",
                Body = $"Name: {contact.Name}\nEmail: {contact.Email}\nMessage: {contact.Message}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(smtpEmail);
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
