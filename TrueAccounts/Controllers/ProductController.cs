using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(trueAccountsDbcontext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var productList = await _context.Products
                .Include(b => b.brand)
                .ToListAsync();

            if(productList != null && productList.Count > 0)
            {
                productList.ForEach(item =>
                {
                    item.image = getImagebyProduct(item.image);
                });
            }
            else
            {
                return new List<Product>();
            }

            return productList;
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("UploadImage")]
        public async Task<ActionResult> uploadImage()
        {
            bool results = false;
            try
            {
                var _uploadedFile = Request.Form.Files[0];
               
                    
                    string FilePath = this._webHostEnvironment.WebRootPath + "\\Uploads\\Products\\";
                   /* if (!System.IO.Directory.Exists(FilePath))
                    {
                        System.IO.Directory.CreateDirectory(FilePath);
                    }
                   */
                    string ImagePath = FilePath + _uploadedFile.FileName;

                    if (System.IO.File.Exists(ImagePath))
                    {
                        System.IO.File.Delete(ImagePath);
                    }
                    using (FileStream stream = System.IO.File.Create(ImagePath))
                    {
                        await _uploadedFile.CopyToAsync(stream);
                        results = true;
                    }
                }
            
            catch(Exception ex)
            {
                
            }
            return Ok(results);
        }

        [NonAction]
        private string filePath(string productCode)
        {
            return this._webHostEnvironment.WebRootPath + "\\Uploads\\Products\\" ;
        }

        private string getImagebyProduct(string productCode)
        {
            string ImageUrl = string.Empty;
            string HostUrl = "https://localhost:7283/";
            //string FilePath = filePath(productCode);
            string FilePath = this._webHostEnvironment.WebRootPath + "\\Uploads\\Products\\";

            //string ImagePath = FilePath 
            if (!System.IO.File.Exists(FilePath + productCode))
            {
                ImageUrl = HostUrl + "/Uploads/Common/noImage.jpg";
            }
            else
            {
                ImageUrl = HostUrl + "/Uploads/Products/" + productCode ;
            }

            return ImageUrl;
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(productAddDto productRequest)
        {
           
            var newProduct = new Product();
            //_mapper.Map(productRequest, newProduct);
            newProduct.productName = productRequest.productName;
            newProduct.unit = productRequest.unit;
            newProduct.salePrice = productRequest.salePrice;
            newProduct.purchasePrice = productRequest.purchasePrice;
            newProduct.image = productRequest.image;
            newProduct.brandId = productRequest.brandId; 


            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = newProduct.id }, newProduct);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.id == id);
        }
    }
}
