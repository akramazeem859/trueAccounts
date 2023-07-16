using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class typeinledger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "supplierLedger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "SaleLedger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "PurchaseLedger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Ledger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "JournalLedger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "CustomerLedger",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "CashAccountLedger",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "supplierLedger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "SaleLedger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "PurchaseLedger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Ledger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "JournalLedger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "CustomerLedger");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "CashAccountLedger");
        }
    }
}
