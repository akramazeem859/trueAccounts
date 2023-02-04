using System.ComponentModel.DataAnnotations.Schema;
using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class productAddDto
    {
       
        public string productName { get; set; }
        public string unit { get; set; }
        public int salePrice { get; set; }
        public int purchasePrice { get; set; }
        public string image { get; set; }
        public int brandId { get; set; }
        //public IFormFile? imageFile { get; set; }
    }
}
