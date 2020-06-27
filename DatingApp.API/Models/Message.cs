using System;

namespace DatingApp.API.Models
{
    public class Message
    {
        // INFORMATION OF MESSAGE
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }

        // SENDER
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public bool SenderDeleted { get; set; }

        // RECIPIENT
        public int RecipientId { get; set; }
        public User Recipient { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}