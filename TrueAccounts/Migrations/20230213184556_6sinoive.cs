using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _6sinoive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SInvoice",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    payable = table.Column<int>(type: "int", nullable: false),
                    paid = table.Column<int>(type: "int", nullable: false),
                    customerId = table.Column<int>(type: "int", nullable: true),
                    freight = table.Column<int>(type: "int", nullable: false),
                    datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    branchId = table.Column<int>(type: "int", nullable: false),
                    accountId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SInvoice", x => x.id);
                    table.ForeignKey(
                        name: "FK_SInvoice_Branches_branchId",
                        column: x => x.branchId,
                        principalTable: "Branches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SInvoice_CashAccount_accountId",
                        column: x => x.accountId,
                        principalTable: "CashAccount",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_SInvoice_Customer_customerId",
                        column: x => x.customerId,
                        principalTable: "Customer",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SInvDetail",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productId = table.Column<int>(type: "int", nullable: false),
                    purchasePrice = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    sInvoiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SInvDetail", x => x.id);
                    table.ForeignKey(
                        name: "FK_SInvDetail_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SInvDetail_SInvoice_sInvoiceId",
                        column: x => x.sInvoiceId,
                        principalTable: "SInvoice",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SInvDetail_productId",
                table: "SInvDetail",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_SInvDetail_sInvoiceId",
                table: "SInvDetail",
                column: "sInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_SInvoice_accountId",
                table: "SInvoice",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_SInvoice_branchId",
                table: "SInvoice",
                column: "branchId");

            migrationBuilder.CreateIndex(
                name: "IX_SInvoice_customerId",
                table: "SInvoice",
                column: "customerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SInvDetail");

            migrationBuilder.DropTable(
                name: "SInvoice");
        }
    }
}
