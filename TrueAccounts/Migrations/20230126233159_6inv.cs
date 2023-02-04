using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _6inv : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PInvoices",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    payable = table.Column<int>(type: "int", nullable: false),
                    paid = table.Column<int>(type: "int", nullable: false),
                    supplierId = table.Column<int>(type: "int", nullable: true),
                    freight = table.Column<int>(type: "int", nullable: false),
                    datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    branchId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PInvoices", x => x.id);
                    table.ForeignKey(
                        name: "FK_PInvoices_Branches_branchId",
                        column: x => x.branchId,
                        principalTable: "Branches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PInvoices_Supplier_supplierId",
                        column: x => x.supplierId,
                        principalTable: "Supplier",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "pInvDetails",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productId = table.Column<int>(type: "int", nullable: false),
                    purchasePrice = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    pInvoiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pInvDetails", x => x.id);
                    table.ForeignKey(
                        name: "FK_pInvDetails_PInvoices_pInvoiceId",
                        column: x => x.pInvoiceId,
                        principalTable: "PInvoices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pInvDetails_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_pInvDetails_pInvoiceId",
                table: "pInvDetails",
                column: "pInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_pInvDetails_productId",
                table: "pInvDetails",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_PInvoices_branchId",
                table: "PInvoices",
                column: "branchId");

            migrationBuilder.CreateIndex(
                name: "IX_PInvoices_supplierId",
                table: "PInvoices",
                column: "supplierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pInvDetails");

            migrationBuilder.DropTable(
                name: "PInvoices");
        }
    }
}
