using MessagePack;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TrueAccounts.Models
{
    public class JVInvDetail
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string CoaCode { get; set; }
        public string Description { get; set; }
        public int Credit { get; set; }
        public int Debit { get; set; }
        public int JvInvId { get; set; }
        public JVInvoice JvInvoice { get; set; }


    }
}
