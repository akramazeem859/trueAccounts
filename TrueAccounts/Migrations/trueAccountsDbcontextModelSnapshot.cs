﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TrueAccounts.Data;

#nullable disable

namespace TrueAccounts.Migrations
{
    [DbContext(typeof(trueAccountsDbcontext))]
    partial class trueAccountsDbcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("TrueAccounts.Models.ChartAccount.level1", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("level1");
                });

            modelBuilder.Entity("TrueAccounts.Models.ChartAccount.level2", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("level1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("level2");
                });

            modelBuilder.Entity("TrueAccounts.Models.ChartAccount.level3", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("level2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("level3");
                });

            modelBuilder.Entity("TrueAccounts.Models.ChartAccount.level4", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ledgerTbl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("level3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("level4");
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

            modelBuilder.Entity("TrueAccounts.Models.CustomerRate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("customerId")
                        .HasColumnType("int");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("rate")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("customerId");

                    b.HasIndex("productId");

                    b.ToTable("CustomerRate");
                });

            modelBuilder.Entity("TrueAccounts.Models.Inventory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("branchId")
                        .HasColumnType("int");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("branchId");

                    b.HasIndex("productId");

                    b.ToTable("Inventory");
                });

            modelBuilder.Entity("TrueAccounts.Models.PInvDetail", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("pInvoiceId")
                        .HasColumnType("int");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("purchasePrice")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("pInvoiceId");

                    b.HasIndex("productId");

                    b.ToTable("pInvDetails");
                });

            modelBuilder.Entity("TrueAccounts.Models.PInvoice", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int?>("accountId")
                        .HasColumnType("int");

                    b.Property<int>("branchId")
                        .HasColumnType("int");

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("datetime")
                        .HasColumnType("datetime2");

                    b.Property<int>("freight")
                        .HasColumnType("int");

                    b.Property<int>("paid")
                        .HasColumnType("int");

                    b.Property<int>("payable")
                        .HasColumnType("int");

                    b.Property<int?>("supplierId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("accountId");

                    b.HasIndex("branchId");

                    b.HasIndex("supplierId");

                    b.ToTable("PInvoices");
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

            modelBuilder.Entity("TrueAccounts.Models.SInvDetail", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<int>("sInvoiceId")
                        .HasColumnType("int");

                    b.Property<int>("salePrice")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("productId");

                    b.HasIndex("sInvoiceId");

                    b.ToTable("sInvDetails");
                });

            modelBuilder.Entity("TrueAccounts.Models.SInvoice", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int?>("accountId")
                        .HasColumnType("int");

                    b.Property<int>("branchId")
                        .HasColumnType("int");

                    b.Property<string>("code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("customerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("datetime")
                        .HasColumnType("datetime2");

                    b.Property<int>("discount")
                        .HasColumnType("int");

                    b.Property<int>("freight")
                        .HasColumnType("int");

                    b.Property<int>("paid")
                        .HasColumnType("int");

                    b.Property<int>("payable")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("accountId");

                    b.HasIndex("branchId");

                    b.HasIndex("customerId");

                    b.ToTable("SInvoice");
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

            modelBuilder.Entity("TrueAccounts.Models.CustomerRate", b =>
                {
                    b.HasOne("TrueAccounts.Models.Customer", "customer")
                        .WithMany()
                        .HasForeignKey("customerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customer");

                    b.Navigation("product");
                });

            modelBuilder.Entity("TrueAccounts.Models.Inventory", b =>
                {
                    b.HasOne("TrueAccounts.Models.Branch", "branch")
                        .WithMany()
                        .HasForeignKey("branchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.Product", "product")
                        .WithMany("inventory")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("branch");

                    b.Navigation("product");
                });

            modelBuilder.Entity("TrueAccounts.Models.PInvDetail", b =>
                {
                    b.HasOne("TrueAccounts.Models.PInvoice", "pInvoice")
                        .WithMany("pInvDetails")
                        .HasForeignKey("pInvoiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("pInvoice");

                    b.Navigation("product");
                });

            modelBuilder.Entity("TrueAccounts.Models.PInvoice", b =>
                {
                    b.HasOne("TrueAccounts.Models.CashAccount", "account")
                        .WithMany()
                        .HasForeignKey("accountId");

                    b.HasOne("TrueAccounts.Models.Branch", "branch")
                        .WithMany("pInvoices")
                        .HasForeignKey("branchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.Supplier", "supplier")
                        .WithMany("pInvoices")
                        .HasForeignKey("supplierId");

                    b.Navigation("account");

                    b.Navigation("branch");

                    b.Navigation("supplier");
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

            modelBuilder.Entity("TrueAccounts.Models.SInvDetail", b =>
                {
                    b.HasOne("TrueAccounts.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.SInvoice", "sInvoice")
                        .WithMany("sInvDetail")
                        .HasForeignKey("sInvoiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("product");

                    b.Navigation("sInvoice");
                });

            modelBuilder.Entity("TrueAccounts.Models.SInvoice", b =>
                {
                    b.HasOne("TrueAccounts.Models.CashAccount", "account")
                        .WithMany()
                        .HasForeignKey("accountId");

                    b.HasOne("TrueAccounts.Models.Branch", "branch")
                        .WithMany()
                        .HasForeignKey("branchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TrueAccounts.Models.Customer", "customer")
                        .WithMany()
                        .HasForeignKey("customerId");

                    b.Navigation("account");

                    b.Navigation("branch");

                    b.Navigation("customer");
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

                    b.Navigation("pInvoices");
                });

            modelBuilder.Entity("TrueAccounts.Models.Brand", b =>
                {
                    b.Navigation("products");
                });

            modelBuilder.Entity("TrueAccounts.Models.Company", b =>
                {
                    b.Navigation("branches");
                });

            modelBuilder.Entity("TrueAccounts.Models.PInvoice", b =>
                {
                    b.Navigation("pInvDetails");
                });

            modelBuilder.Entity("TrueAccounts.Models.Product", b =>
                {
                    b.Navigation("inventory");
                });

            modelBuilder.Entity("TrueAccounts.Models.SInvoice", b =>
                {
                    b.Navigation("sInvDetail");
                });

            modelBuilder.Entity("TrueAccounts.Models.Supplier", b =>
                {
                    b.Navigation("pInvoices");
                });
#pragma warning restore 612, 618
        }
    }
}
