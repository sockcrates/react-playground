GRPC_DIR = ./lib/grpc
GRPC_BUILD_DIR = $(GRPC_DIR)/cmake/build
GRPC_INSTALL_DIR = $(shell echo $$HOME)/.local
OPENSSL_ROOT_DIR = $(shell which openssl)
UNAME = $(shell uname)
SRCS = $(wildcard ./backend/src/*.cpp) $(PROTO_SRC_CC) $(GRPC_SRC_CC)
TARGET = x86_64-linux-gnu

all: deps grpc protobuf/grpc protobuf/c

deps:
ifeq ($(UNAME), Darwin)
	@which autoconf automake cmake libtool openssl pkg-config
endif
ifeq ($(UNAME), Linux)
	@which build-essential autoconf libtool pkg-config
endif

grpc:
	cd $(GRPC_DIR) && \
	mkdir -p $(GRPC_BUILD_DIR) && \
	cmake -DgRPC_INSTALL=ON \
		-DgRPC_BUILD_TESTS=OFF \
		-DgRPC_PROTOBUF_PROVIDER=package \
		-DgRPC_ZLIB_PROVIDER=package \
		-DgRPC_CARES_PROVIDER=package \
		-DgRPC_SSL_PROVIDER=package \
		-DgRPC_ABSL_PROVIDER=package \
		-DgRPC_RE2_PROVIDER=package \
		-DOPENSSL_INCLUDE_DIR=$(OPENSSL_ROOT_DIR) \
		-DCMAKE_INSTALL_PREFIX=$(GRPC_INSTALL_DIR) && \
	make -j && \
	make install

protobuf: protobuf/grpc protobuf/c

protobuf/grpc:
	protoc -I ./proto --grpc_out=./proto/build --plugin=protoc-gen-grpc=`which grpc_cpp_plugin` \
		./proto/shopping_list.proto

protobuf/c:
	protoc -I ./proto --cpp_out=./proto/build ./proto/shopping_list.proto

shoppingList:
	zig build -Dtarget=$(TARGET)

clean:
	rm -rf build
