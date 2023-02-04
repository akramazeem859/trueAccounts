using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class productImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactNumber",
                table: "Brands",
                newName: "contactNumber");

            migrationBuilder.AddColumn<int>(
                name: "purchasePrice",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "salePrice",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "purchasePrice",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "salePrice",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "contactNumber",
                table: "Brands",
                newName: "ContactNumber");
        }
    }
}
