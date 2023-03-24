using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class ledger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CashAccountLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    credit = table.Column<int>(type: "int", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashAccountLedger", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    credit = table.Column<int>(type: "int", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerLedger", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    credit = table.Column<int>(type: "int", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseLedger", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "SaleLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    credit = table.Column<int>(type: "int", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleLedger", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "supplierLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    credit = table.Column<int>(type: "int", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_supplierLedger", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CashAccountLedger");

            migrationBuilder.DropTable(
                name: "CustomerLedger");

            migrationBuilder.DropTable(
                name: "PurchaseLedger");

            migrationBuilder.DropTable(
                name: "SaleLedger");

            migrationBuilder.DropTable(
                name: "supplierLedger");
        }
    }
}
