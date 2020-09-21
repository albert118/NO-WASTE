# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'NO-WASTE'
copyright = '2020, Ryan Clemi, Albert Ferguson, Kayla Gel, Jayden Lee, Alice Nguyen'
author = 'Ryan Clemi, Albert Ferguson, Kayla Gel, Jayden Lee, Alice Nguyen'

# The short X.Y version.
version = '1.0'
# The full version, including alpha/beta/rc tags
release = 'v1.0.0-alpha'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# -- Options for PDF output --------------------------------------------------

# See: http://rst2pdf.ralsina.me/handbook.html#styles
# For documentation 

# Grouping the document tree into PDF files. List of tuples
# (source start file, target name, title, author, options).
#
# If there is more than one author, separate them with \\.
# For example: r'Guido van Rossum\\Fred L. Drake, Jr., editor'
#
# The options element is a dictionary that lets you override
# this config per-document.
# For example,
# ('index', u'MyProject', u'My Project', u'Author Name',
#  dict(pdf_compressed = True))
# would mean that specific document would be compressed
# regardless of the global pdf_compressed setting.

extensions.append('rst2pdf.pdfbuilder') # PDF module plugin
pdf_documents = [
	('index', u'Final Product Proposal', project, author),
] # generate the doc

# A comma-separated list of custom stylesheets. Example:
pdf_stylesheets = ['twocolumn', 'autumn', 'A4']

# A list of folders to search for stylesheets. Example:
pdf_style_path = ['.', '_styles']

pdf_break_level = 1

# Create a compressed PDF
# Use True/False or 1/0
# Example: compressed=True

pdf_compressed = False

# Language to be used for hyphenation support
pdf_language = "en_US"

# Mode for literal blocks wider than the frame. Can be
# overflow, shrink or truncate
pdf_fit_mode = "shrink"

# Name of the cover page template to use. IF NEEDED FOR A PROJECT ADD IT HERE
#pdf_cover_template = 'sphinxcover.tmpl

# Documents to append as an appendix to all manuals.
#pdf_appendices = []

# Set the default DPI for images
pdf_default_dpi = 72

# Enable rst2pdf extension modules (default is only vectorpdf)
# you need vectorpdf if you want to use sphinx's graphviz support
#pdf_extensions = ['vectorpdf']

# Page template name for "regular" pages
pdf_page_template = 'cutePage'

# Show Table Of Contents at the beginning?
pdf_use_toc = True

# -- Options for HTML output -------------------------------------------------

# If true, "Created using Sphinx" is shown in the HTML footer. Default is True.
#
# html_show_sphinx = True

# If true, "(C) Copyright ..." is shown in the HTML footer. Default is True.
#
# html_show_copyright = True

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'alabaster'
html_logo = "_static/logo.png"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

autosummary_generate = True
numfig = True
# Module names always prefix files.
# add_module_names = True
# Authors per module are shown.
show_authors = True
# Don't include TODO notes into documentation renderings.
todo_include_todos = False

# -- Setting Source Paths ----------------------------------------------------

this_path = os.path.dirname(os.path.abspath(__file__))
this_path = os.path.dirname(this_path)
this_path = os.path.dirname(this_path)

js_root = os.path.abspath(os.path.join(this_path, 'src', 'sanitise', 'src'))
# js_pages = os.path.abspath(os.path.join(js_root, 'pages'))
# js_components = os.path.abspath(os.path.join(js_root, 'components'))
# Paths that containg JS source code.
# js_source_path = [js_root, js_pages, js_components]
js_language = "javascript" # change to Typescript if need be.
root_for_relative_js_paths = js_root

python_package_source = os.path.abspath(os.path.join(this_path, 'src', 'backend'))
