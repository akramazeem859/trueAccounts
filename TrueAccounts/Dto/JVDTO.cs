using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class JVDTO:JVInvoice
    {
        public List<JVInvDetail> Detail{ get; set; }    
    }
}
