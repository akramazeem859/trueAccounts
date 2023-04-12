using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class jv : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CashAccountLedger");

            migrationBuilder.DropTable(
                name: "CustomerLedger");

            migrationBuilder.DropTable(
                name: "PurchaseLedger");

            migrationBuilder.DropTable(
                name: "SaleLedger");

            migrationBuilder.DropPrimaryKey(
                name: "PK_supplierLedger",
                table: "supplierLedger");

            migrationBuilder.RenameTable(
                name: "supplierLedger",
                newName: "Ledger");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Ledger",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ledger",
                table: "Ledger",
                column: "id");

            migrationBuilder.CreateTable(
                name: "JVInvoice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    EnterDt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JVInvoice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JVInvoice_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JVInvDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                     .Annotation("SqlServer:Identity", "1, 1"),
                    CoaCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Credit = table.Column<int>(type: "int", nullable: false),
                    Debit = table.Column<int>(type: "int", nullable: false),
                    JvInvId = table.Column<int>(type: "int", nullable: false)
                    
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JVInvDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JVInvDetails_JVInvoice_JvInvoiceId",
                        column: x => x.JvInvId,
                        principalTable: "JVInvoice",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JVInvDetails_JvInvoiceId",
                table: "JVInvDetails",
                column: "JvInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_JVInvoice_BranchId",
                table: "JVInvoice",
                column: "BranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JVInvDetails");

            migrationBuilder.DropTable(
                name: "JVInvoice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ledger",
                table: "Ledger");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Ledger");

            migrationBuilder.RenameTable(
                name: "Ledger",
                newName: "supplierLedger");

            migrationBuilder.AddPrimaryKey(
                name: "PK_supplierLedger",
                table: "supplierLedger",
                column: "id");

            migrationBuilder.CreateTable(
                name: "CashAccountLedger",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    credit = table.Column<int>(type: "int", nullable: false),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    credit = table.Column<int>(type: "int", nullable: false),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    credit = table.Column<int>(type: "int", nullable: false),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    branchId = table.Column<int>(type: "int", nullable: false),
                    coaCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    credit = table.Column<int>(type: "int", nullable: false),
                    dateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    debit = table.Column<int>(type: "int", nullable: false),
                    invCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    particular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleLedger", x => x.id);
                });
        }
    }
}
