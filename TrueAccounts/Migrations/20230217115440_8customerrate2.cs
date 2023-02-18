using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _8customerrate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "CustomerRate",
                newName: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRate_customerId",
                table: "CustomerRate",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRate_productId",
                table: "CustomerRate",
                column: "productId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerRate_Customer_customerId",
                table: "CustomerRate",
                column: "customerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerRate_Products_productId",
                table: "CustomerRate",
                column: "productId",
                principalTable: "Products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerRate_Customer_customerId",
                table: "CustomerRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerRate_Products_productId",
                table: "CustomerRate");

            migrationBuilder.DropIndex(
                name: "IX_CustomerRate_customerId",
                table: "CustomerRate");

            migrationBuilder.DropIndex(
                name: "IX_CustomerRate_productId",
                table: "CustomerRate");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CustomerRate",
                newName: "id");
        }
    }
}
