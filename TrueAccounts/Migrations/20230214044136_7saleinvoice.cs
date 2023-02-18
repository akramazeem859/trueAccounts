using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _7saleinvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SInvDetail_Products_productId",
                table: "SInvDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_SInvDetail_SInvoice_sInvoiceId",
                table: "SInvDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SInvDetail",
                table: "SInvDetail");

            migrationBuilder.RenameTable(
                name: "SInvDetail",
                newName: "sInvDetails");

            migrationBuilder.RenameIndex(
                name: "IX_SInvDetail_sInvoiceId",
                table: "sInvDetails",
                newName: "IX_sInvDetails_sInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_SInvDetail_productId",
                table: "sInvDetails",
                newName: "IX_sInvDetails_productId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_sInvDetails",
                table: "sInvDetails",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_sInvDetails_Products_productId",
                table: "sInvDetails",
                column: "productId",
                principalTable: "Products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_sInvDetails_SInvoice_sInvoiceId",
                table: "sInvDetails",
                column: "sInvoiceId",
                principalTable: "SInvoice",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_sInvDetails_Products_productId",
                table: "sInvDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_sInvDetails_SInvoice_sInvoiceId",
                table: "sInvDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_sInvDetails",
                table: "sInvDetails");

            migrationBuilder.RenameTable(
                name: "sInvDetails",
                newName: "SInvDetail");

            migrationBuilder.RenameIndex(
                name: "IX_sInvDetails_sInvoiceId",
                table: "SInvDetail",
                newName: "IX_SInvDetail_sInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_sInvDetails_productId",
                table: "SInvDetail",
                newName: "IX_SInvDetail_productId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SInvDetail",
                table: "SInvDetail",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_SInvDetail_Products_productId",
                table: "SInvDetail",
                column: "productId",
                principalTable: "Products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SInvDetail_SInvoice_sInvoiceId",
                table: "SInvDetail",
                column: "sInvoiceId",
                principalTable: "SInvoice",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
