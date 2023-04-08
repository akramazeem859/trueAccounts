using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class JVDTO 
    {
       
        public string Code { get; set; }
        public string Particular { get; set; }
        public DateTime DateTime { get; set; }
        public int BranchId { get; set; }
       
        public int UserId { get; set; }
        public DateTime EnterDt { get; set; }
        public string Remarks { get; set; }

        public List<JVDetailDTO> Detail{ get; set; }    
    }
}

