FROM python:3.11-slim
ENV BOT_NAME=$BOT_NAME

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends 
        # curl \
        # && rm -rf /var/lib/apt/lists/*

# Install Rust and Cargo
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Add Cargo to the PATH
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /usr/src/app/"${BOT_NAME:-tg_bot}"

COPY requirements.txt /usr/src/app/"${BOT_NAME:-tg_bot}"
RUN pip install --no-cache-dir -r /usr/src/app/"${BOT_NAME:-tg_bot}"/requirements.txt
COPY . /usr/src/app/"${BOT_NAME:-tg_bot}"

CMD python3 -m main