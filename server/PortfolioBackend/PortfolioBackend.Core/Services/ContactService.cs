using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;
using System.Net.Mail;
using System.Net;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class ContactService : IContactService
    {
        public async Task SendEmailAsync(Contact contact)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("ayhamdarwish1993@gmail.com", "faqv vkff bstm vkrm"), // Use environment variables
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(contact.Email),
                Subject = "Ayham Portfolio",
                Body = $"Name: {contact.Name}\nEmail: {contact.Email}\nMessage: {contact.Message}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add("ayhamdarwish1993@gmail.com");
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
