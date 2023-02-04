﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TrueAccounts.Data;

#nullable disable

namespace TrueAccounts.Migrations
{
    [DbContext(typeof(trueAccountsDbcontext))]
    [Migration("20230114141335_4accounts")]
    partial class _4accounts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TrueAccounts.Models.Branch", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("branchName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("companyId")
                        .HasColumnType("int");

                    b.Property<string>("contactNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("supervisor")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("companyId");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("TrueAccounts.Models.Brand", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("brandName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contactNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("TrueAccounts.Models.CashAccount", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("accountBalance")
                        .HasColumnType("int");

                    b.Property<int>("accountBranchId")
                        .HasColumnType("int");

                    b.Property<string>("accountCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("accountTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("accountType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("accountBranchId");

                    b.ToTable("CashAccount");
                });

            modelBuilder.Entity("TrueAccounts.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("TrueAccounts.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("customerAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("customerBranchId")
                        .HasColumnType("int");

                    b.Property<string>("customerCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("customerCurrentbalance")
                        .HasColumnType("int");

                    b.Property<string>("customerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("customerNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("customerOpeningbalance")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("customerBranchId");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("TrueAccounts.Models.Product", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("brandId")
                        .HasColumnType("int");

                    b.Property<string>("image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("productName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("purchasePrice")
                        .HasColumnType("int");

                    b.Property<int>("salePrice")
                        .HasColumnType("int");

                    b.Property<string>("unit")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("brandId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("TrueAccounts.Models.Supplier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("supplierAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("supplierBranchId")
                        .HasColumnType("int");

                    b.Property<string>("supplierCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("supplierCurrentbalance")
                        .HasColumnType("int");

                    b.Property<string>("supplierName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("supplierNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("supplierOpeningbalance")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("supplierBranchId");

                    b.ToTable("Supplier");
                });

            modelBuilder.Entity("TrueAccounts.Models.Branch", b =>
                {
                    b.HasOne("TrueAccounts.Models.Company", "company")
                        .WithMany("branches")
                        .HasForeignKey("companyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("company");
                });

            modelBuilder.Entity("TrueAccounts.Models.CashAccount", b =>
                {
                    b.HasOne("TrueAccounts.Models.Branch", "accountBranch")
                        .WithMany("CashAccount")
                        .HasForeignKey("accountBranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("accountBranch");
                });

            modelBuilder.Entity("TrueAccounts.Models.Customer", b =>
                {
                    b.HasOne("TrueAccounts.Models.Branch", "customerBranch")
                        .WithMany("Customer")
                        .HasForeignKey("customerBranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customerBranch");
                });

            modelBuilder.Entity("TrueAccounts.Models.Product", b =>
                {
                    b.HasOne("TrueAccounts.Models.Brand", "brand")
                        .WithMany("products")
                        .HasForeignKey("brandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("brand");
                });

            modelBuilder.Entity("TrueAccounts.Models.Supplier", b =>
                {
                    b.HasOne("TrueAccounts.Models.Branch", "supplierBranch")
                        .WithMany("Supplier")
                        .HasForeignKey("supplierBranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("supplierBranch");
                });

            modelBuilder.Entity("TrueAccounts.Models.Branch", b =>
                {
                    b.Navigation("CashAccount");

                    b.Navigation("Customer");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("TrueAccounts.Models.Brand", b =>
                {
                    b.Navigation("products");
                });

            modelBuilder.Entity("TrueAccounts.Models.Company", b =>
                {
                    b.Navigation("branches");
                });
#pragma warning restore 612, 618
        }
    }
}
